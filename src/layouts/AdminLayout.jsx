import { Outlet, NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LogoutBtn from '../components/LogoutBtn';
import Toast from '../components/Toast';
import Loading from '../components/Loading';
import ScrollToTop from '../components/ScrollToTop';
import logo from '../assets/logo.png';
import { showLoading, hideLoading } from "../redux/loadingSlice";

export default function AdminLayout() {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const { isLoading, loadingText } = useSelector((state) => state.loading);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const isProductPage = location.pathname.startsWith("/admin/products/"); // 判斷是否在商品管理頁面
  const isOrderPage = location.pathname.startsWith("/admin/orders/"); // 判斷是否在訂單管理頁面
  const navList = [
    { path: "/admin", name: "後台首頁", navName: 'admin' },
    { path: "/admin/products/1", name: "商品管理", navName: 'products' },
    { path: "/admin/orders/1", name: "訂單管理", navName: 'orders' },
    { path: "/", name: "返回前台", navName: 'front' },
  ];

  const checkUserLogin = useCallback(async (retry = 0) => {
    dispatch(showLoading("讀取中..."));
    try {
      await axios.post(`${API_URL}/v2/api/user/check`);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error)
      if (retry < 3) {
        setTimeout(() => checkUserLogin(retry + 1), 500);
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
    } finally {
      dispatch(hideLoading());
    }
  }, [API_URL, dispatch, navigate]);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)reactHWToken\s*=\s*([^;]*).*$)|^.*$/, "$1",
    );

    if (token.length > 0) {
      axios.defaults.headers.common['Authorization'] = token;
      checkUserLogin();
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [checkUserLogin, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  if (isAuthenticated === null) {
    return <Loading loadingText="登入驗證中..." />;
  }

  return (
    <>
      {/* 讀取效果 */}
      {isLoading && <Loading loadingText={loadingText} />}

      {/* 訊息提示 */}
      <Toast />

      {/* 導覽列 */}
      <nav className="navbar navbar-light navbar-expand-lg text-primary fixed-top shadow bg-dark" data-bs-theme="dark">
        <div className="container">
          <Link className="navbar-brand site-title" to={`/admin`}>
            <img src={logo} style={{ width: 50, marginRight: '5px' }} alt="Logo" /> Daniel&apos;s Burger Admin
          </Link>

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
                        `btn ${menuOpen ? "btn-lg" : "btn-sm"} ${(route.navName === "products" && isProductPage) ||
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
              <li className="nav-item ms-2 logout"><LogoutBtn menuOpen={menuOpen} /></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 內容 */}
      <Outlet />

      {/* 置頂按鈕 */}
      <ScrollToTop />
    </>
  )
}