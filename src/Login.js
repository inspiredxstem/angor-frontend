import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./reducers/authSlice";
import store from "./store";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        username: usernameRef.current.value,
        password: passwordRef.current.value
      })
    );
    // usernameRef.current.value = "";
    // passwordRef.current.value = "";
    if (store.getState().user.loading) {
      navigate("/home");
    } else {
      console.log("Get help");
    }
  };

  return (
    <>
      <div className="loginForm">
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input type="username" ref={usernameRef} className="input-login" />
          <label>Password </label>
          <input type="password" ref={passwordRef} className="input-login" />
          <input type="submit"></input>
        </form>
      </div>
    </>
  );
}
