import React, { useEffect, useState } from "react";
import "./Settings.scss";
import { adminEventNames, regex } from "../../../constant/constants.jsx";
import FeeForm from "./FeeComponent.jsx";
import { getFee } from "../../../helpers/commonApiHelpers.jsx";

function PlateformContent({ closeModal }) {
  const [defaultFee, setDefaultFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDefaultFee = async () => {
      let fee = await getFee(setIsLoading, adminEventNames.getPlatformFee);
      setDefaultFee(fee);
    };
    getDefaultFee();
  }, []);

  return (
    <FeeForm
      label="Fee Percentage %"
      eventName={adminEventNames.setPlatformFee}
      closeModal={closeModal}
      feeValue={defaultFee}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      regex={regex}
    />
  );
}

export default PlateformContent;
