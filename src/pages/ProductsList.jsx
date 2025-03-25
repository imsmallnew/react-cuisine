import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from 'axios';
import ReactLoading from 'react-loading';
import { motion, AnimatePresence } from "framer-motion";
import { pushMessage } from '../redux/toastSlice';
import { showLoading, hideLoading } from "../redux/loadingSlice";
import { getCartList } from '../redux/cartSlice';

export default function ProductsList() {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const AUTHOR = import.meta.env.VITE_API_PATH;

  const dispatch = useDispatch();
  const [cartItem, setCartItem] = useState({});
  const [state, setState] = useState(false);
  const [clientProductList, setClientProductList] = useState(null);
  const [navigation] = useState("menu");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  // 依分類篩選產品
  const filteredProducts = selectedCategory
    ? clientProductList?.filter(item => item.category === selectedCategory)
    : clientProductList;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [location.search, setSelectedCategory]);

  // 取得客戶商品資料
  const getClientProducts = useCallback(async () => {
    dispatch(showLoading("讀取中..."));

    try {
      const res = await axios.get(`${API_URL}/v2/api/${AUTHOR}/products/all`)
      let data = res.data.products;
      setClientProductList(data);
    } catch (error) {
      console.error(error)
      dispatch(pushMessage({
        title: "取得商品列表失敗",
        text: error?.message,
        status: "failed"
      }))
    } finally {
      dispatch(hideLoading());
    }
  }, [API_URL, AUTHOR, dispatch]);

  useEffect(() => {
    getClientProducts()
  }, [navigation, getClientProducts])

  // 加入購物車
  const addCartItem = async (item, qty) => {
    setCartItem(item)
    setState(true)
    try {
      await axios.post(`${API_URL}/v2/api/${AUTHOR}/cart`, {
        data: {
          product_id: item.id,
          qty: Number(qty)
        }
      })
      dispatch(getCartList(false));
      dispatch(pushMessage({
        title: "更新數量成功",
        text: `[${item.title}] 已加入購物車 ${qty} ${item.unit}`,
        status: "success"
      }))
      setState(false); // 取消按鈕disabled
    } catch (error) {
      dispatch(pushMessage({
        title: "更新數量失敗",
        text: error?.response?.data?.message || `[${item.title}] 加到購物車失敗`,
        status: "failed"
      }))
      console.error(error)
    }
  }

  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1491960693564-421771d727d6?q=80&w=2863&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          position: "relative",
          paddingTop: "70px",
        }}
      >
        {/* 背景遮罩 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 1,
          }}
        ></div>

        <div className="row">
          
          {/* 左側固定分類欄 */}
          <div className="d-flex flex-md-column flex-row col-12 col-md-2 d-md-block category-list">
            <ul className="list-group list-group-horizontal-md list-group-flush flex-md-column flex-row w-100 text-center">
              {/* 全部商品按鈕 */}
              <motion.li
                className={`d-none d-md-block list-group-item ${selectedCategory === null ? "active bg-warning text-dark" : ""}`}
                onClick={() => setSelectedCategory(null)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: "#fff",
                  border: "none",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                全部商品
              </motion.li>

              {/* 動態分類按鈕 */}
              {[...new Set(clientProductList?.map((item) => item.category))].map((category, index) => (
                <motion.li
                  key={category}
                  className={`list-group-item ${selectedCategory === category ? "active bg-warning text-dark" : ""} py-1 py-md-2`}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "none",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {category}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 右側商品列表 */}
          <div className="col-12 col-md-10 offset-md-2 px-2 mt-md-0 mt-5 pt-3" style={{ zIndex: 10 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory} // 每次分類變更，觸發動畫
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="row mt-4"
              >
                {filteredProducts?.map((item) => (
                  <div key={item.id} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                    <motion.div
                      className="card h-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                        borderRadius: "10px",
                        overflow: "hidden",
                        padding: "10px",
                        paddingBottom: "5px",
                      }}
                    >

                      <Link to={`/products/${item.id}`}>
                        <div className="overflow-hidden" style={{ height: "250px", borderRadius: "10px", position: "relative" }}>
                          <motion.img
                            src={item?.imageUrl}
                            alt="商品圖片"
                            className="card-img-top"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "10px",
                              position: "absolute",
                              top: "0",
                              left: "0",
                              transformOrigin: "center",
                            }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </Link>

                      <div className="card-body text-center text-white">
                        <h4 className="card-title">{item.title}</h4>
                        <span className="badge bg-danger me-1 mt-1" style={{ verticalAlign: "top" }}>
                          {item.category}
                        </span>
                        <h4 className="text-warning d-inline"> {item.price} 元 </h4>
                        <h6 className="text-light d-inline">
                          <del>{item.origin_price} 元</del>
                        </h6>
                      </div>

                      {/* 商品詳情 / 加到購物車 */}
                      <div className="card-footer d-flex px-0">
                        <Link
                          className="btn btn-outline-light w-50 d-flex justify-content-center align-items-center"
                          to={`/products/${item.id}`}
                        >
                          <i className="fas fa-search me-2"></i> 商品詳情
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-warning w-50 d-flex justify-content-center align-items-center ms-2"
                          onClick={() => addCartItem(item, 1)}
                          disabled={cartItem && state && item.id === cartItem.id}
                        >
                          <div className="d-flex align-items-center">{cartItem && state && item.id === cartItem.id ? (
                            <ReactLoading type="spin" color="#FFD700" height="1rem" width="1rem" className="d-flex" />
                          ) : (
                            <i className="fa-solid fa-cart-shopping"></i>
                          )}
                          </div>
                          <span className="ms-2">加入購物車</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}