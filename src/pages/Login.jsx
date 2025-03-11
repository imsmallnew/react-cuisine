import { useState, useEffect, useCallback } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Loading from '../components/Loading';
import Toast from '../components/Toast';
import { pushMessage } from '../redux/toastSlice';
import { showLoading, hideLoading } from "../redux/loadingSlice";

export default function Login() {
    const API_URL = import.meta.env.VITE_BASE_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, loadingText } = useSelector((state) => state.loading);

    const [account, setAccount] = useState({
        username: "",
        password: ""
    });

    // 登入按鈕
    const handleLogin = async (e) => {
        e.preventDefault(); // 取消原生submit事件
        dispatch(showLoading("讀取中..."));

        try {
            const res = await axios.post(`${API_URL}/v2/admin/signin`, account)
            // 登入成功, 取得token,expired參數
            const { token, expired } = res.data

            // 寫入自定義reactHWToken至Cookies: 瀏覽器F12 => Application => Cookies
            document.cookie = `reactHWToken=${token}; expires=${new Date(expired)}`;
            axios.defaults.headers.common['Authorization'] = token;

            dispatch(pushMessage({
                title: "系統提示",
                text: "驗證登入成功, 歡迎進入商品管理後台",
                status: "success"
            }))
            navigate("/admin");
        } catch (error) {
            dispatch(pushMessage({
                title: "系統提示",
                text: error?.response?.data?.message || `使用者 ${account.username} 登入失敗`,
                status: "failed"
            }))
        } finally {
            dispatch(hideLoading());
        }
    }

    // 檢查登入狀態
    const checkUserLogin = useCallback(async () => {
        dispatch(showLoading("讀取中..."));

        try {
            await axios.post(`${API_URL}/v2/api/user/check`)
            dispatch(pushMessage({
                title: "系統提示",
                text: "驗證登入成功, 歡迎進入商品管理後台",
                status: "success"
            }))
            navigate("/admin");
        } catch (error) {
            console.error(error)
            dispatch(pushMessage({
                title: "系統提示",
                text: error?.response?.data?.message || error?.message,
                status: "failed"
            }))
        } finally {
            dispatch(hideLoading());
        }
    }, [API_URL, dispatch, navigate]);
    
    // 若有Cookie則直接驗證
    useEffect(() => {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)reactHWToken\s*=\s*([^;]*).*$)|^.*$/, "$1",
        );
        if (token.length > 0) {
            axios.defaults.headers.common['Authorization'] = token;
            checkUserLogin()
        }
    }, [checkUserLogin])

    // 處理輸入框
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value,
        })
    }

    return (
        <>
            {/* 讀取效果 */}
            {isLoading && <Loading loadingText={loadingText} />}

            {/* 系統提示 */}
            <Toast />

            {/* 導覽列 */}
            <nav className="navbar navbar-light navbar-expand text-primary navbar-toggleable fixed-top shadow bg-dark" data-bs-theme="dark">
                <div className="container">
                    <a className="navbar-brand site-title">
                        <img src='https://storage.googleapis.com/vue-course-api.appspot.com/imsmallnew/1740577531932.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hacFYUa9Ch66uvhPKL0%2FmE5%2BmOwT4bwuA6gRYAxMZCXJE3p9Yvq9CjWXXfLZ0MRO%2FIOur7bocEHtSYJtQRu76ou1n3WPXja1T2Dw89JmiRAqcWye7wTvenzth%2FTL5KX2%2FtfrPDJRQD1B0SDJA8%2Fq5uTs7IjplfCX2JyTipZ4gKs3JcfuhEKhA0CzxTmHd3U%2BGun8TCBiokVdkY%2BulezROsPDKxy9xMrxYi39JXS%2B1xS3XhXim7t7VOxY1ncZ9zL3VuBb8y2TuiI5Dc0Sr8DOa2uGZVQ9uQlawag0PtgjbtD6%2FifZcKxCDbTnEM57vR9zEUf9ud%2FlhrwOIWAnl9XGDQ%3D%3D' style={{ width: 50, marginRight: '5px' }} /> Daniel&apos;s Burger Admin
                    </a>
                    <div className="d-flex">
                        <NavLink
                            to={"/"}
                            className={({ isActive }) =>
                                `btn btn-sm ${isActive ? "btn-secondary" : "btn-outline-secondary"} me-2`
                            }
                        >
                            {"返回首頁"}
                        </NavLink>
                    </div>
                </div>
            </nav>

            {/* 內容 */}
            <div className="container">
                <div className="container-fluid">
                    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                        <h1 className="mb-5">商品管理系統</h1>
                        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                            <div className="form-floating mb-3">
                                <input type="email" name="username" onChange={handleInputChange} className="form-control" id="username" placeholder="" value={account.username} />
                                <label htmlFor="username">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" name="password" onChange={handleInputChange} className="form-control" id="password" placeholder="" value={account.password} />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn btn-primary">登入</button>
                        </form>
                        <p className="mt-5 mb-3 text-muted">&copy; 2024 - Daniel&apos;s Burger All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
