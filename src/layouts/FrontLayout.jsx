import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import Toast from '../components/Toast';
import Loading from '../components/Loading';
import { getCartList } from '../redux/cartSlice';

export default function FrontLayout() {
    const { isLoading, loadingText } = useSelector((state) => state.loading);
    const { cartList } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation(); // 取得當前路由

    // 透過cartSlice取得購物車資料
    useEffect(() => {
        dispatch(getCartList());
    }, [dispatch]);

    const navList = [
        { path: "/", name: "首頁", navName: 'home' },
        { path: "/products", name: "商品列表", navName: 'products' },
        { path: "/cart", name: "檢視購物車", navName: 'cart' },
        { path: "/form", name: "結帳表單", navName: 'form' },
        { path: "login", name: "後台管理", navName: 'admin' },
    ];

    return (
        <>
            {/* 讀取效果 */}
            {isLoading && <Loading loadingText={loadingText} />}

            {/* 訊息提示 */}
            <Toast />

            {/* 導覽列 */}
            <nav className="navbar navbar-light navbar-expand-lg fixed-top shadow">
                <div className="container">
                    <a className="navbar-brand site-title">
                        <img src='https://storage.googleapis.com/vue-course-api.appspot.com/imsmallnew/1740577531932.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hacFYUa9Ch66uvhPKL0%2FmE5%2BmOwT4bwuA6gRYAxMZCXJE3p9Yvq9CjWXXfLZ0MRO%2FIOur7bocEHtSYJtQRu76ou1n3WPXja1T2Dw89JmiRAqcWye7wTvenzth%2FTL5KX2%2FtfrPDJRQD1B0SDJA8%2Fq5uTs7IjplfCX2JyTipZ4gKs3JcfuhEKhA0CzxTmHd3U%2BGun8TCBiokVdkY%2BulezROsPDKxy9xMrxYi39JXS%2B1xS3XhXim7t7VOxY1ncZ9zL3VuBb8y2TuiI5Dc0Sr8DOa2uGZVQ9uQlawag0PtgjbtD6%2FifZcKxCDbTnEM57vR9zEUf9ud%2FlhrwOIWAnl9XGDQ%3D%3D' style={{ width: 50, marginRight: '5px' }} /> Daniel's Burger
                    </a>

                    {/* 漢堡選單按鈕 (手機版) */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* 導覽連結 */}
                    <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
                        <ul className="navbar-nav ms-auto">
                            {navList.map((route, index) => (
                                (index !== 3 || location.pathname === "/form") && (
                                    <li className="nav-item" key={index}>
                                        <NavLink
                                            key={index}
                                            to={route.path}
                                            className={({ isActive }) =>
                                                `btn btn-sm ${isActive ? "btn-secondary" : "btn-light"} ms-3 position-relative`
                                            }
                                            onClick={() => setMenuOpen(false)} // 點擊後關閉選單
                                        >
                                            {route.name}{route.navName === "cart" && cartList?.carts?.length > 0 && <span className='badge rounded-pill bg-danger ms-2 mobileValue'>{cartList?.carts?.length}</span>}

                                            {/* 只有在購物車數量 > 0 時才顯示數字 */}
                                            {route.navName === "cart" && cartList?.carts?.length > 0 && (
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-1 me-1 webValue">
                                                    {cartList?.carts?.length}
                                                </span>
                                            )}
                                        </NavLink>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* 內容 */}
            <Outlet />

            {/* 頁尾 */}
            {!isLoading && <footer className="footer bg-dark w-100" style={{ position: "relative", bottom: 0, left: 0, zIndex: 100, }}>
                <div className="container">
                    <div className="d-flex align-items-center justify-content-center text-white py-2">
                        <p className="mb-0 text-center">
                            &copy; 2024 - Daniel&apos;s Burger All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>}
        </>
    )
}