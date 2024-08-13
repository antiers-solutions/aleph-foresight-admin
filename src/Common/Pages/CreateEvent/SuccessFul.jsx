import React from "react";
import { SuccessIcon } from "../../../assets/svgImages/StoreAsset.jsx";
import ButtonCustom from "../../ButtonCustom/ButtonCustom";
import "./CreateEvent.scss";

function SuccessFul({ close, content }) {
  return (
    <div className="successModal">
      <SuccessIcon />
      <h4>Success</h4>
      <p>{content}</p>
      <ButtonCustom label="Done" onClick={close} />
    </div>
  );
}

export default SuccessFul;
