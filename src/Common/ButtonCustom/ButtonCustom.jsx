import React from "react";
import "./ButtonCustom.scss";
import ButtonLoader from "../Loader.jsx/ButtonLoader";

function ButtonCustom({
  label,
  onClick,
  type,
  isDisabled,
  tabIndex,
  id,
  children,
  className,
  walletBtn,
  transbtn,
  btnBorder,
  isLoading,
}) {
  return (
    <button
      className={`buttonCustom ${className} ${btnBorder ? "btnBorder" : ""} ${
        walletBtn ? "walletBtn" : transbtn ? "transbtn" : ""
      } ${isDisabled ? "disable" : ""}`}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      tabIndex={tabIndex}
      id={id}
    >
      {children}
      {isLoading ? <ButtonLoader /> : label}
    </button>
  );
}

export default ButtonCustom;
