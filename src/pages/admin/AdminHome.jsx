import { useEffect, useState, useCallback } from "react";
import ReactLoading from 'react-loading';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { pushMessage } from '../../redux/toastSlice';
import { hideLoading } from "../../redux/loadingSlice";

export default function AdminHome() {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const AUTHOR = import.meta.env.VITE_API_PATH;

  const dispatch = useDispatch();
  const [calculate, setCalculate] = useState(true);
  const [topSalesByQuantity, setTopSalesByQuantity] = useState([]);
  const [topSalesByAmount, setTopSalesByAmount] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderStatus, setOrderStatus] = useState([]);

  // 處理訂單數據
  const calculateSales = useCallback((ordersData) => {
    const productSales = {}; // { 產品名稱: { totalNum, totalAmount } }
    let totalRevenue = 0; // 訂單總金額

    ordersData.forEach(order => {
      totalRevenue += order.total || 0; // 計算總收入
      Object.values(order.products).forEach(item => {
        const title = item.product?.title || "未知商品";
        const num = item?.qty || 0; // 確保 num 不為 undefined
        const totalAmount = item?.final_total || 0; // 確保 final_total 不為 undefined
        if (!productSales[title]) {
          productSales[title] = { totalNum: 0, totalAmount: 0 };
        }

        productSales[title].totalNum += num;
        productSales[title].totalAmount += totalAmount;
      });
    });

    // 排序並取前3名
    const sortedByQuantity = Object.entries(productSales)
      .sort((a, b) => b[1].totalNum - a[1].totalNum) // 依據數量降序
      .slice(0, 3)
      .map(([title, data]) => ({ title, ...data }));

    const sortedByAmount = Object.entries(productSales)
      .sort((a, b) => b[1].totalAmount - a[1].totalAmount) // 依據金額降序
      .slice(0, 3)
      .map(([title, data]) => ({ title, ...data }));

    setTopSalesByQuantity(sortedByQuantity);
    setTopSalesByAmount(sortedByAmount);
    setTotalRevenue(totalRevenue);
    setCalculate(false);
  }, []);

  // 計算訂單狀態
  const calculateOrderStatus = useCallback((ordersData) => {
    const today = new Date().toISOString().split("T")[0]; // 取得今日日期 (YYYY-MM-DD)
    let todayOrders = 0;
    let paidOrders = 0;
    let unpaidOrders = 0;

    ordersData.forEach(order => {
      const orderDate = new Date(order.create_at * 1000).toISOString().split("T")[0]; // 轉換為 YYYY-MM-DD
      if (orderDate === today) {
        todayOrders += 1;
      }
      if (order.is_paid) {
        paidOrders += 1;
      } else {
        unpaidOrders += 1;
      }
    });

    const statusList = [
      { title: "📅 今日訂單:", value: todayOrders + " 件" },
      { title: "📦 總訂單:", value: ordersData.length + " 件" },
      { title: "✅ 已付款:", value: paidOrders + " 件" },
      { title: "❌ 未付款:", value: unpaidOrders + " 件" },
    ];

    setOrderStatus(statusList);
  }, []);

  // 獲取所有頁數的訂單資料
  const fetchAllOrders = useCallback(async () => {
    try {
      const firstResponse = await axios.get(`${API_URL}/v2/api/${AUTHOR}/admin/orders`);
      const { total_pages } = firstResponse.data.pagination;

      let allOrders = firstResponse.data.orders; // 儲存第一頁的訂單資料

      // 依 total_pages 取得所有訂單
      const requests = [];
      for (let page = 2; page <= total_pages; page++) {
        requests.push(axios.get(`${API_URL}/v2/api/${AUTHOR}/admin/orders?page=${page}`));
      }

      const responses = await Promise.all(requests);
      responses.forEach(res => {
        allOrders = allOrders.concat(res.data.orders);
      });

      calculateSales(allOrders);
      calculateOrderStatus(allOrders);
    } catch (error) {
      console.error(error);
      dispatch(pushMessage({
        title: "獲取訂單失敗",
        text: error?.response?.data?.message || `請稍後再試`,
        status: "failed"
      }))
    } finally {
      dispatch(hideLoading());
    }
  }, [API_URL, AUTHOR, calculateOrderStatus, calculateSales, dispatch]);

  useEffect(() => {
    fetchAllOrders()
  }, [fetchAllOrders])

  return (
    <>
      <div
        className="position-fixed w-100"
        style={{
          minHeight: "100vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1491960693564-421771d727d6?q=80&w=1024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "auto",
        }}
      />

      <div className="container mt-5 pt-2">
        <div className="main text-white mb-5 text-center">
          <h1 className="text-center pb-2 fs-1 fw-bold">歡迎來到商品管理後台！</h1>
        </div>

        <div className="row">
          {/* 訂單總收入 */}
          <div className="col-md-6 mb-4">
            <div className="card p-3 shadow h-100 d-flex flex-column card-bg">
              <h4>💰 訂單總收入</h4>
              <div className="d-flex justify-content-center align-items-center flex-grow-1">
                {calculate ? <ReactLoading type="spin" color="#000000" height="2rem" width="2rem" className="d-flex text-success" />
                  : <p className="display-3 text-success text-center logo-type">${totalRevenue.toLocaleString()}</p>}
              </div>
            </div>
          </div>

          {/* 訂單狀態 */}
          <div className="col-md-6 mb-4">
            <div className="card p-3 shadow h-100 d-flex flex-column card-bg">
              <h4>📊 訂單狀態</h4>
              {calculate ? <div className="d-flex justify-content-center align-items-center flex-grow-1"><ReactLoading type="spin" color="#000000" height="2rem" width="2rem" className="d-flex text-success" /></div>
                : <ul className="flex-grow-1 d-flex flex-column justify-content-center">
                  {orderStatus.map((item, index) => (
                    <li key={index}>{item.title} {item.value}</li>
                  ))}
                </ul>}
            </div>
          </div>

          {/* Top 3 銷售數量 */}
          <div className="col-md-6 mb-4">
            <div className="card p-3 shadow d-flex flex-column card-bg">
              <h4 className="logo-type">🔥 銷售數量 Top 3</h4>
              {calculate ? <div className="d-flex justify-content-center align-items-center flex-grow-1"><ReactLoading type="spin" color="#000000" height="2rem" width="2rem" className="d-flex text-success" /></div>
                : <ul className="flex-grow-1 d-flex flex-column justify-content-center">
                  {topSalesByQuantity.map((item, index) => (
                    <li key={index}>{index + 1}. {item.title} - {item.totalNum} 件</li>
                  ))}
                </ul>}
            </div>
          </div>

          {/* Top 3 銷售金額 */}
          <div className="col-md-6">
            <div className="card p-3 shadow  d-flex flex-column card-bg">
              <h4 className="logo-type">💵 銷售金額 Top 3</h4>
              {calculate ? <div className="d-flex justify-content-center align-items-center flex-grow-1"><ReactLoading type="spin" color="#000000" height="2rem" width="2rem" className="d-flex text-success" /></div>
                : <ul className="flex-grow-1 d-flex flex-column justify-content-center">
                  {topSalesByAmount.map((item, index) => (
                    <li key={index}>{index + 1}. {item.title} - ${item.totalAmount.toLocaleString()}</li>
                  ))}
                </ul>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}