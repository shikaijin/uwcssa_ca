import React from "react";
import "../../App.css";
import Form from "../form_login/Form";
import Login_func from "../login/Login";
export default function SignUp() {
  return (
    <>
      <h1 className="sign-up">SIGN UP</h1>
      <div className="login-container">
        <div className="login-card">{/* <Login_func /> */}</div>
      </div>
    </>
  );
}
