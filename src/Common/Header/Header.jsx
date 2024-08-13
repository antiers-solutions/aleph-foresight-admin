import React from "react";
import "./Header.scss";
import profile from "../../assets/images/profile.svg";
import ButtonCustom from "../ButtonCustom/ButtonCustom.jsx";
import { WalletIcon } from "../../assets/svgImages/StoreAsset.jsx";
import useCurrentWidth from "../CustomHook/useCurrentWidth.jsx";
import useWalletConnection from "../../hooks/useWalletConnection.jsx";
import { isLoggedIn } from "../../utils/walletHelpers.jsx";
import trimAddressLength from "../../helpers/commonHelpers.jsx";

function HeaderContent() {
  const width = useCurrentWidth();
  const loggedInAddress = isLoggedIn();
  const { isDisabled, addNetwork } = useWalletConnection();

  return (
    <div className="header">
      <div className="header_heading">
        <h2>Welcome To Aleph Foresight</h2>
        {loggedInAddress ? (
          <div className="header_heading_profile">
            <img src={profile} alt="profile" />
            <span>{trimAddressLength(loggedInAddress)}</span>
          </div>
        ) : (
          <ButtonCustom
            walletBtn
            label={width > 767 ? "Connect Wallet" : ""}
            onClick={() => addNetwork()}
            disabled={isDisabled}
          >
            <WalletIcon />
          </ButtonCustom>
        )}
      </div>
    </div>
  );
}

export default HeaderContent;
