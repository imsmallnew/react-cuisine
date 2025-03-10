import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import axios from 'axios';
import { pushMessage } from '../redux/toastSlice';
import { showLoading, hideLoading } from "../redux/loadingSlice";

export default function LogoutBtn() {
    const API_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 登出按鈕
    const handleLogout = async () => {
        dispatch(showLoading("讀取中..."));

        try {
            await axios.post(`${API_URL}/v2/logout`)
            document.cookie = `reactHWToken=; expires=`; // 清除Cookie
            dispatch(pushMessage({
                title: "系統提示",
                text: `使用者已登出`,
                status: "success"
            }))
            navigate("/login");
        } catch (error) {
            console.error(error)
            dispatch(pushMessage({
                title: "系統提示",
                text: error?.response?.data?.message || `使用者登出失敗`,
                status: "failed"
            }))
        } finally {
            dispatch(hideLoading());
        }
    }

    return (
        <>
            <div className="nav-item">
                <button className="btn btn-sm btn-outline-secondary" type="button" id="logoutBtn" onClick={handleLogout}>登出後台</button>
            </div>
        </>
    )
}