import React, { useState } from "react";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../../assets/svgImages/StoreAsset";
import { handleLogout } from "../../helpers/commonApiHelpers";

function LogoutModal({ closeDisputeModal }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    const isLogout = await handleLogout(setLoading);
    if (isLogout) {
      navigate("/");
    }
  };

  return (
    <div className="logoutData">
      <div className="sureModel">
        <LogoutIcon />
        <div className="sureModel_innerSec">
          <h2>Logout Account?</h2>
          <p>Are you sure you want to logout? </p>
        </div>
        <div className="btn">
          <ButtonCustom
            label="Yes"
            onClick={() => logoutHandler()}
            isLoading={loading}
          />
          <ButtonCustom
            label="No"
            btnBorder
            onClick={closeDisputeModal}
            isDisabled={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
