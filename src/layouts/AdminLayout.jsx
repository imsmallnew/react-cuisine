import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState } from 'react';
import LogoutBtn from '../components/LogoutBtn';
import Toast from '../components/Toast';
import Loading from '../components/Loading';

export default function AdminLayout() {
    const { isLoading, loadingText } = useSelector((state) => state.loading);
    const location = useLocation(); // 獲取當前網址
    const [menuOpen, setMenuOpen] = useState(false);
    const isProductPage = location.pathname.startsWith("/admin/products/"); // 判斷是否在商品管理頁面
    const isOrderPage = location.pathname.startsWith("/admin/orders/"); // 判斷是否在訂單管理頁面
    const navList = [
        { path: "/admin", name: "後台首頁", navName: 'admin' },
        { path: "/admin/products/1", name: "商品管理", navName: 'products' },
        { path: "/admin/orders/1", name: "訂單管理", navName: 'orders' },
        { path: "/", name: "返回前台", navName: 'front' },
    ];

    return (
        <>
            {/* 讀取效果 */}
            {isLoading && <Loading loadingText={loadingText} />}

            {/* 訊息提示 */}
            <Toast />

            {/* 導覽列 */}
            <nav className="navbar navbar-light navbar-expand-lg text-primary fixed-top shadow bg-dark" data-bs-theme="dark">
                <div className="container">
                    <a className="navbar-brand site-title">
                        <img src='/logo.png' style={{ width: 50, marginRight: '5px' }} /> Daniel&apos;s Burger Admin
                    </a>

                    {/* 漢堡選單按鈕 (手機版) */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
                        <ul className="navbar-nav ms-auto">
                            {navList.map((route, index) => {
                                const isExactMatch = location.pathname === route.path; // 只匹配完全相同的路徑
                                return (
                                    <li className="nav-item" key={index}>
                                        <NavLink
                                            key={index}
                                            to={route.path}
                                            onClick={() => setMenuOpen(false)} // 點擊後關閉選單
                                            className={() =>
                                                `btn btn-sm ${(route.navName === "products" && isProductPage) ||
                                                    (route.navName === "orders" && isOrderPage) ||
                                                    (isExactMatch)
                                                    ? "btn-secondary"
                                                    : "btn-outline-secondary"
                                                } ms-2`
                                            }
                                        >
                                            {route.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                            <li className="nav-item ms-2 logout"><LogoutBtn /></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* 內容 */}
            <Outlet />
        </>
    )
}