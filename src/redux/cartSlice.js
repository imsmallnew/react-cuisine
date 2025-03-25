import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showLoading, hideLoading } from "./loadingSlice";
import { pushMessage } from "./toastSlice";

const API_URL = import.meta.env.VITE_BASE_URL;
const AUTHOR = import.meta.env.VITE_API_PATH;

export const getCartList = createAsyncThunk(
  "cart/getCartList",
  async (payload = true, { dispatch, rejectWithValue }) => {
    try {
      payload && dispatch(showLoading("讀取中...")) // 商品列表加入購物車時不顯示整頁面讀取
      const res = await axios.get(`${API_URL}/v2/api/${AUTHOR}/cart`)
      return res?.data?.data;
    } catch (error) {
      console.error(error)
      dispatch(pushMessage({
        title: "取得購物車清單失敗",
        text: error?.response?.data?.message || error?.message,
        status: "failed"
      }))
      return rejectWithValue(error?.response?.data?.message || error?.message || "取得購物車清單失敗")
    } finally {
      dispatch(hideLoading())
    }
  }
);

const initialState = {
  cartList: [],
  status: "idle",
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCartList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartList = action.payload;
      })
      .addCase(getCartList.rejected, (state, action) => {
        state.status = "failed";
        state.cartList = action.payload;
      })
  }
});

export default cartSlice.reducer;