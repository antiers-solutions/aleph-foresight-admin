import React from "react";
import Logo from "../../../assets/Logo.svg";
import "./ErrorBoundary.scss";
function ErrorBoundary() {
  return (
    <div className="errorBoundary">
      <div className="errorBoundary_content">
        <img src={Logo} alt="Logo" />
        <h4 style={{ marginTop: 20 }}>Oops! Unexpected error</h4>
        <h6>Something went wrong... </h6>
        <p>An error occured.</p>
      </div>
    </div>
  );
}

export default ErrorBoundary;
