import React, { useEffect, useState } from "react";
import "./CommonDetailCard.scss";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { adminEventNames, platformFeeTooltip } from "../../constant/constants";
import { previewCardData } from "../../constant/structuralContants";
import { getFee } from "../../helpers/commonApiHelpers";
import { InfoIcon } from "../../assets/svgImages/StoreAsset";
import { Tooltip } from "antd";

function PreviewEvent({
  onClick,
  data,
  closeEventModal,
  disable,
  isLoading,
  setIsLoading,
}) {
  const [platformFee, setPlatFormFee] = useState(0);

  useEffect(() => {
    const getPlatformFee = async () => {
      let fee = await getFee(setIsLoading, adminEventNames.getPlatformFee);
      setPlatFormFee(fee);
    };
    getPlatformFee();
  }, []);

  return (
    <div className="disputeDetails">
      <div className="disputeDetails__details">
        {previewCardData(data)?.map(({ id, heading, paragraph }) => (
          <div className="disputeDetails__details__preview" key={id}>
            <h4>{heading || "-"}</h4>
            <p>{paragraph || "-"}</p>
          </div>
        ))}
        {/* <div className="disputeDetails__details__description">
          <h4>Description</h4>
          <p className="desc">{data?.description || "-"}</p>
        </div> */}
      </div>
      <div className="disputeDetails__info">
        <p>
          <Tooltip title={platformFeeTooltip} placement="top">
            <p>
              <InfoIcon />
            </p>
          </Tooltip>
          Platform Fee <span> : {+platformFee || 0}%</span>
        </p>
        <div className="disputeDetails__info__buttons">
          <ButtonCustom
            label="Back"
            transbtn
            onClick={closeEventModal}
            isDisabled={isLoading}
          />

          <ButtonCustom
            label="Publish"
            onClick={() => onClick()}
            isDisabled={disable}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewEvent;
