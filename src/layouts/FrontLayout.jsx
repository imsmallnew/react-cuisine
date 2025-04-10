import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import Toast from '../components/Toast';
import Loading from '../components/Loading';
import ScrollToTop from '../components/ScrollToTop';
import { getCartList } from '../redux/cartSlice';
import logo from '../assets/logo.png';

export default function FrontLayout() {
  const { isLoading, loadingText } = useSelector((state) => state.loading);
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navList = [
    { path: "/", name: "首頁", navName: 'home' },
    { path: "/products", name: "商品列表", navName: 'products' },
    { path: "/cart", name: "檢視購物車", navName: 'cart' },
    { path: "/form", name: "結帳表單", navName: 'form' },
    { path: "login", name: "後台管理", navName: 'admin' },
  ];

  // 透過cartSlice取得購物車資料
  useEffect(() => {
    dispatch(getCartList());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      {/* 讀取效果 */}
      {isLoading && <Loading loadingText={loadingText} />}

      {/* 訊息提示 */}
      <Toast />

      {/* 導覽列 */}
      <nav className="navbar navbar-light navbar-expand-lg fixed-top shadow">
        <div className="container">
          <Link className="navbar-brand site-title" to={`/`}>
            <img src={logo} style={{ width: 50, marginRight: '5px' }} alt="Logo" /> Daniel&apos;s Burger
          </Link>

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
                        `btn ${menuOpen ? "btn-lg" : "btn-sm"} ${isActive ? "btn-secondary" : "btn-light"} ms-3 position-relative`
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
      {!isLoading && <footer
        className="footer bg-dark w-100"
        style={{ position: "relative", bottom: 0, left: 0, zIndex: 100 }}
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-center text-white py-2">
            {/* 桌面版 (顯示單行) */}
            <p className="mb-0 text-center d-none d-md-block">
              &copy; 2025 - Daniel&apos;s Burger All Rights Reserved.
            </p>

            {/* 手機版 (顯示分行) */}
            <p className="mb-0 text-center d-md-none">
              &copy; 2025 <br />
              Daniel&apos;s Burger All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
      }

      {/* 置頂按鈕 */}
      <ScrollToTop />
    </>
  )
}