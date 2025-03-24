import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Modal } from 'bootstrap';
import { Link } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import { pushMessage } from '../redux/toastSlice';
import { showLoading, hideLoading } from "../redux/loadingSlice";
import { getCartList } from '../redux/cartSlice';

export default function Cart() {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const AUTHOR = import.meta.env.VITE_API_PATH;

  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);

  const defaultModalState = {
    title: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content: "",
    is_enabled: 0,
    imageUrl: "",
    imagesUrl: []
  };
  const [tempProduct] = useState(defaultModalState);
  const [cartItem, setCartItem] = useState({});
  const [isLoading] = useState(false);
  const [navigation] = useState("cart");
  const deleteModalRef = useRef(null);
  const deleteModalInstanceRef = useRef(null);

  // 確保模態框 DOM 已掛載後初始化 Modal 實例
  useEffect(() => {
    if (deleteModalRef.current) {
      deleteModalInstanceRef.current = new Modal(deleteModalRef.current, { backdrop: false });
    }
  }, []);

  // 開啟 DeleteModal
  const openDeleteModal = (item) => {
    setCartItem(item);
    if (deleteModalInstanceRef.current) {
      deleteModalInstanceRef.current.show(); // 確保 Modal 實例已初始化後調用 show()
    } else {
      console.error("Modal instance is not initialized.");
    }
  };

  // 關閉 DeleteModal
  const closeDeleteModal = () => {
    if (deleteModalInstanceRef.current) {
      deleteModalInstanceRef.current.hide(); // 確保 Modal 實例已初始化後調用 hide()
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

  // 取得購物車資料
  // const getCartList = async () => {
  //   dispatch(showLoading("讀取中..."));

  //   try {
  //     const res = await axios.get(`${API_URL}/v2/api/${AUTHOR}/cart`)
  //     let data = res.data?.data;
  //     setCartList(data)
  //   } catch (error) {
  //     console.error(error)
  //     dispatch(pushMessage({
  //       title: "系統提示",
  //       text: error?.response?.data?.message || `取得購物車清單失敗`,
  //       status: "failed"
  //     }))
  //   } finally {
  //     dispatch(hideLoading());
  //   }
  // }

  // 更新購物車
  const updateCartItem = async (cartItem, qty) => {
    dispatch(showLoading("更新購物車中..."));

    try {
      const res = await axios.put(`${API_URL}/v2/api/${AUTHOR}/cart/${cartItem?.id}`, {
        data: {
          product_id: cartItem?.product?.id,
          qty: Number(qty)
        }
      })
      dispatch(getCartList())
      dispatch(pushMessage({
        title: "更新成功",
        text: `[${cartItem?.product?.title}] 數量已更新為 ${res.data?.data?.qty} ${cartItem?.product?.unit}`,
        status: "success"
      }))
    } catch (error) {
      console.error(error)
      dispatch(pushMessage({
        title: "系統提示",
        text: error?.response?.data?.message || `購物車更新數量失敗`,
        status: "failed"
      }))
    } finally {
      dispatch(hideLoading());
    }
  }

  // 刪除購物車單一商品
  const removeCartItem = async (cartItem) => {
    dispatch(showLoading("移除購物車商品中..."));

    try {
      await axios.delete(`${API_URL}/v2/api/${AUTHOR}/cart/${cartItem.id}`)
      closeDeleteModal()
      dispatch(getCartList())
      dispatch(pushMessage({
        title: "刪除成功",
        text: `[${cartItem?.product?.title}] 已從購物車移除`,
        status: "success"
      }))
    } catch (error) {
      console.error(error)
      dispatch(pushMessage({
        title: "系統提示",
        text: error?.response?.data?.message || `刪除購物車商品失敗`,
        status: "failed"
      }))
    } finally {
      dispatch(hideLoading());
    }
  }

  // 刪除購物車所有商品
  const removeAllCart = async () => {
    dispatch(showLoading("清空購物車商品中..."));

    try {
      await axios.delete(`${API_URL}/v2/api/${AUTHOR}/carts`)
      closeDeleteModal()
      dispatch(getCartList())
      dispatch(pushMessage({
        title: "系統提示",
        text: `購物車已清空`,
        status: "success"
      }))
    } catch (error) {
      console.error(error)
      dispatch(pushMessage({
        title: "系統提示",
        text: error?.response?.data?.message || `清空購物車商品失敗`,
        status: "failed"
      }))
    } finally {
      dispatch(hideLoading());
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
          paddingTop: '60px',
          position: "relative",
          paddingBottom: '40px',
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
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            zIndex: 1,
          }}
        ></div>
        <div className="container position-relative pb-3 bg-white rounded-3 mt-5" style={{ zIndex: 2, }}>
          <div className="mt-4">
            {/* 桌機版：維持 Table 格式 */}
            <div className="table-responsive d-none d-md-block">
              <table className="table mt-3 table-hover text-dark bg-light overflow-hidden">
                <thead className="table-warning text-dark">
                  <tr className="text-center">
                    <th style={{ width: '120px' }}>圖片</th>
                    <th>商品名稱</th>
                    <th>分類</th>
                    <th style={{ width: '150px' }}>訂購數量</th>
                    <th>單價</th>
                    <th>小計</th>
                    <th style={{ width: '180px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cartList?.carts?.map((cartItem) => (
                    <tr key={cartItem?.id} className="align-middle text-center">
                      <td className="text-start">
                        <img src={cartItem?.product?.imageUrl} className="rounded border border-gold" alt="主圖" width="100" />
                      </td>
                      <td className="text-center"><h5>{cartItem?.product?.title}</h5></td>
                      <td><span className="badge bg-danger">{cartItem?.product?.category}</span></td>
                      <td>
                        <div className="btn-group" role="group">
                          <button type="button" disabled={cartItem?.qty === 1 || isLoading} className="btn btn-outline-dark btn-sm"
                            onClick={() => updateCartItem(cartItem, cartItem?.qty - 1)}>−</button>
                          <span className="btn border border-secondary bg-white text-dark" style={{ width: "50px", cursor: "auto" }}>
                            {cartItem.qty}
                          </span>
                          <button type="button" disabled={isLoading} className="btn btn-outline-dark btn-sm"
                            onClick={() => updateCartItem(cartItem, cartItem?.qty + 1)}>+</button>
                        </div>
                      </td>
                      <td className="text-dark fw-bold">{cartItem?.product?.price} 元</td>
                      <td className="text-dark fw-bold">{cartItem?.total} 元</td>
                      <td>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => openDeleteModal(cartItem)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 手機版：改用卡片呈現 */}
            <div className="d-md-none pt-3">
              {cartList?.carts?.map((cartItem) => (
                <div key={cartItem?.id} className="card mb-3 shadow-sm">
                  <div className="row g-0 align-items-center">
                    <div className="col-6 p-2">
                      <img src={cartItem?.product?.imageUrl} className="img-fluid rounded border border-gold" alt="主圖" />
                    </div>
                    <div className="col-6">
                      <div className="card-body p-2">
                        <h6 className="card-title">{cartItem?.product?.title}</h6>
                        <p className="mb-1"><span className="badge bg-danger">{cartItem?.product?.category}</span></p>
                        <p className="mb-1 text-dark fw-bold">單價：{cartItem?.product?.price} 元</p>
                        <p className="mb-1 text-dark fw-bold">小計：{cartItem?.total} 元</p>

                        {/* 訂購數量 */}
                        <div className="btn-group btn-group-sm mt-1" role="group">
                          <button type="button" disabled={cartItem?.qty === 1 || isLoading} className="btn btn-outline-dark"
                            onClick={() => updateCartItem(cartItem, cartItem?.qty - 1)}>−</button>
                          <span className="btn border border-secondary bg-white text-dark" style={{ width: "40px", cursor: "auto" }}>
                            {cartItem.qty}
                          </span>
                          <button type="button" disabled={isLoading} className="btn btn-outline-dark"
                            onClick={() => updateCartItem(cartItem, cartItem?.qty + 1)}>+</button>
                        </div>

                        {/* 刪除按鈕 */}
                        <button type="button" className="btn btn-danger btn-sm mt-1 ms-2" onClick={() => openDeleteModal(cartItem)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 總計資訊 */}
            <div className="text-end bg-white rounded-3 p-3">
              <h5 className="text-dark">總計：<span className="text-danger fw-bold">{cartList?.total} 元</span></h5>
              <h5 className="text-dark">折扣價：<span className="text-success fw-bold">{cartList?.final_total} 元</span></h5>
            </div>

            {/* 按鈕區塊 */}
            <div className="container">
              <div className="row g-2 mt-2 justify-content-end text-center text-md-end">
                {cartList?.carts?.length !== 0 && (
                  <div className="col-12 col-md-3">
                    <button className="btn btn-outline-danger w-100 px-4 py-2" type="button" onClick={() => openDeleteModal({})}>
                      <span>清空購物車</span>
                    </button>
                  </div>
                )}
                <div className="col-12 col-md-3">
                  <Link className="btn btn-dark btn-hover w-100 px-4 py-2" to={'/products'}>
                    <span>繼續購物</span>
                  </Link>
                </div>

                {cartList?.carts?.length !== 0 && (
                  <div className="col-12 col-md-3">
                    <Link className="btn btn-dark btn-hover w-100 px-4 py-2" to={'/form'}>
                      <span>結帳表單</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*** 刪除Modal ***/}
      <DeleteModal
        deleteModalRef={deleteModalRef}
        tempProduct={tempProduct}
        navigation={navigation}
        cartItem={cartItem}
        removeCartItem={removeCartItem}
        removeAllCart={removeAllCart}
        closeDeleteModal={closeDeleteModal}
      />
    </>
  );
}