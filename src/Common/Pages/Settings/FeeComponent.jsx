import React, { useEffect, useState } from "react";
import InputCustom from "../../InputCustom/InputCustom.jsx";
import ButtonCustom from "../../ButtonCustom/ButtonCustom.jsx";
import "./Settings.scss";
import { contractEvents } from "../../../utils/contractHelpers.jsx";
import { customToast } from "../../Toast/toast.jsx";

function FeeForm({
  label,
  eventName,
  closeModal,
  feeValue,
  isLoading,
  setIsLoading,
  regex,
}) {
  const [fee, setFee] = useState("");
  const [disable, setDisable] = useState(true);

  const handleFeeChange = (e) => {
    const { value } = e.target;
    if (regex.test(value)) {
      setDisable(value === "");
      setFee(value);
    }
  };

  const handleOnClick = async () => {
    setIsLoading(true);
    try {
      const feesInCents = Number(fee) * 100;
      const data = await contractEvents({ eventName, fees: feesInCents });
      if (data?.length) {
        closeModal();
        customToast.success("Transaction successful");
      } else {
        customToast.error("No data returned from transaction");
      }
    } catch (err) {
      customToast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFee(feeValue);
  }, [feeValue]);

  return (
    <div className="plateformContent">
      <InputCustom
        regularInput
        label={label}
        placeholder="%"
        onChange={handleFeeChange}
        value={fee}
        disabled={isLoading}
        id="fee"
      />
      <div className="plateformContent__button">
        <ButtonCustom
          label="Save"
          onClick={handleOnClick}
          isLoading={isLoading}
          isDisabled={disable}
        />
      </div>
    </div>
  );
}

export default FeeForm;
