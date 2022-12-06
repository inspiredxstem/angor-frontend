import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let initialState = {
  user: "",
  token: "",
  loading: false
};

export const loginUser = createAsyncThunk("user", async (body) => {
  let res = await axios.post("http://127.0.0.1:3000/login", body, {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
  return await res.data;
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    }
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
      console.log("No");
    },
    [loginUser.fulfilled]: (state, { payload: { user, token } }) => {
      state.loading = false;
      state.token = token;
      state.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = true;
      console.log("help");
    }
  }
});

export const { addToken, addUser } = authSlice.actions;
export default authSlice.reducer;
