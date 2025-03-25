import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { Modal } from 'bootstrap';
import OrderMenu from '../components/OrderMenu';
import Pagination from "../components/Pagination";
import OrderModal from '../components/OrderModal';
import { pushMessage } from '../redux/toastSlice';
import { showLoading, hideLoading } from "../redux/loadingSlice";

export default function AdminOrders() {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const AUTHOR = import.meta.env.VITE_API_PATH;

  const { page: page_value } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(Number(page_value));
  const [orderList, setOrderList] = useState([]);
  const [targetOrder, setTargetOrder] = useState({})
  const [state, setState] = useState(false);
  const [navigation] = useState("admin");
  const [cartItem] = useState({});
  const orderModalRef = useRef(null);
  const orderModalInstanceRef = useRef(null);

  // 取得訂單資料
  const getOrders = useCallback(async (page) => {
    dispatch(showLoading("讀取中..."));
    try {
      await axios.get(`${API_URL}/v2/api/${AUTHOR}/orders?page=${page}`)
        .then((res) => {
          setOrderList(res.data.orders) // 訂單資料
          setPageInfo(res.data.pagination) // 頁碼
        })
    } catch (error) {
      console.error(error)
      dispatch(pushMessage({
        title: "系統提示",
        text: error?.response?.data?.message || `取得商品資料失敗`,
        status: "failed"
      }))
    } finally {
      dispatch(hideLoading());
    }
  }, [API_URL, AUTHOR, dispatch]);

  // 檢查登入狀態
  const checkUserLogin = useCallback(async () => {
    dispatch(showLoading("讀取中..."));
    try {
      await axios.post(`${API_URL}/v2/api/user/check`)
    } catch (error) {
      dispatch(pushMessage({
        title: "系統提示",
        text: error?.response?.data?.message || `驗證登入失敗`,
        status: "failed"
      }))
      navigate("/login")
    } finally {
      dispatch(hideLoading());
    }
  }, [API_URL, dispatch, navigate]);

  // 若有Cookie則直接驗證, 若失敗則導回login
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)reactHWToken\s*=\s*([^;]*).*$)|^.*$/, "$1",
    );
    if (token.length > 0) {
      axios.defaults.headers.common['Authorization'] = token;
      checkUserLogin()
    } else {
      navigate("/login")
    }
  }, [checkUserLogin, navigate])

  // 當 `page` 變更時，取得資料
  useEffect(() => {
    getOrders(page);
  }, [page, getOrders]);

  // 當網址 (`page_value`) 變更時，更新 `page`
  useEffect(() => {
    if (Number(page_value) !== page) {
      setPage(Number(page_value));
    }
  }, [page_value, setPage, page]);

  // 點擊頁碼時，更新網址 & page
  const handlePageChange = (newPage) => {
    setPage(newPage); // 先更新 state
    navigate(`/admin/orders/${newPage}`, { replace: true });
  };

  // 更新付款狀態
  const updatePay = async (product) => {
    dispatch(showLoading("更新付款狀態中..."));
    try {
      await axios.post(`${API_URL}/v2/api/${AUTHOR}/pay/${product.id}`)
      getOrders(page); // 重新取得商品清單
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(hideLoading());
    }
  }

  const handleChangeOption = async (e, item) => {
    const newValue = e.target.value === "Y" ? 1 : 0;
    const updateItem = { ...item, is_enabled: newValue };
    try {
      await updatePay(updateItem); // 更新付款狀態
      const status = updateItem.is_enabled === 1 ? "已付款" : "未付款";
      dispatch(pushMessage({
        title: "更新付款狀態成功",
        text: `訂單號碼: ${item.id}<br />訂購人: ${item.user.email}<br />狀態: ${status}`,
        status: "success"
      }))
      closeOrderModal()
    } catch (error) {
      dispatch(pushMessage({
        title: `系統提示`,
        text: error?.response?.data?.message || `[訂單號碼]${item.id}: 更新付款狀態失敗`,
        status: "failed"
      }))
    }
  };

  // 確保模態框 DOM 已掛載後初始化 Modal 實例
  useEffect(() => {
    if (orderModalRef.current) {
      orderModalInstanceRef.current = new Modal(orderModalRef.current, { backdrop: false });
    }
  }, []);

  // 開啟 OrderModal
  const openOrderModal = (item) => {
    setTargetOrder(item);
    setTimeout(() => {
      setState(false)
    }, 500)
    if (orderModalInstanceRef.current) {
      orderModalInstanceRef.current.show();
    } else {
      console.error("Modal instance is not initialized.");
    }
  };

  // 關閉 OrderModal
  const closeOrderModal = () => {
    if (orderModalInstanceRef.current) {
      orderModalInstanceRef.current.hide();
      setTimeout(() => {
        setTargetOrder({})
      }, 500)
    } else {
      console.error("Modal instance is not initialized.");
    }
  };

  // 將焦點從 modal 中移除
  window.addEventListener('hide.bs.modal', () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });

  return (
    <>
      {/* 訂單列表 */}
      <div className="container main">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-4 mb-5">
              <OrderMenu
                state={state}
                orderList={orderList}
                targetOrder={targetOrder}
                openOrderModal={openOrderModal}
                handleChangeOption={handleChangeOption}
                setTargetOrder={setTargetOrder}
              />
              <Pagination
                pageInfo={pageInfo}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/***  訂單Modal ***/}
      <OrderModal
        orderModalRef={orderModalRef}
        targetOrder={targetOrder}
        navigation={navigation}
        cartItem={cartItem}
        closeOrderModal={closeOrderModal}
        handleChangeOption={handleChangeOption}
      />
    </>
  )
}