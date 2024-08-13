import React, { useEffect, useState } from "react";
import "./Settings.scss";
import {
  adminEventNames,
  eventRegex,
  regex,
} from "../../../constant/constants.jsx";
import FeeForm from "./FeeComponent.jsx";
import { getFee } from "../../../helpers/commonApiHelpers.jsx";

function EventCreate({ closeModal }) {
  const [defaultFee, setDefaultFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDefaultFee = async () => {
      let fee = await getFee(setIsLoading, adminEventNames.getEventFee);
      setDefaultFee(fee);
    };
    getDefaultFee();
  }, []);

  return (
    <FeeForm
      label="Reward Percentage %"
      eventName={adminEventNames.setEventFees}
      closeModal={closeModal}
      feeValue={defaultFee}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      regex={eventRegex}
    />
  );
}

export default EventCreate;
