import React from "react";
import logo from "../../../assets/Logo.svg";
import ButtonCustom from "../../ButtonCustom/ButtonCustom";
import "./Login.scss";
import useWalletConnection from "../../../hooks/useWalletConnection.jsx";
import { Spin } from "antd";

function Login() {
  const { isDisabled, addNetwork, isLoading } = useWalletConnection();

  return isLoading ? (
    <div className="mainLoader">
      <Spin size="large" />
    </div>
  ) : (
    <div className="loginBoard">
      <div className="loginBoard_left"></div>
      <div className="loginBoard_right">
        <div className="loginBoard_right_content">
          {/* <div className="loginBoard_right_content_logo">
            <img src={logo} alt="logo" />
          </div> */}
          <h3>Admin Panel</h3>
          <div className="loginBoard_ right_content_input"></div>
          <div className="spacing_top-20">
            <ButtonCustom
              label="Connect Wallet"
              disabled={isDisabled}
              onClick={() => addNetwork()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
