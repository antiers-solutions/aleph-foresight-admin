import React from "react";
import "./CommonDetailCard.scss";
import { disputeCardData } from "../../constant/structuralContants.jsx";

function CommonDetailCard({ modalData }) {
  return (
    <div className="disputeDetails" data-testid="common-detail-card">
      <div className="disputeDetails__details">
        {disputeCardData(modalData)?.map((card) => (
          <div className="disputeDetails__details__inner" key={card?.id}>
            <h4>{card?.heading || "-"}</h4>
            <p>{card?.paragraph || "-"}</p>
          </div>
        ))}
        <div className="disputeDetails__details__description">
          <h4>Description</h4>
          <p className="desc">
            {modalData?.description ? modalData?.description : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CommonDetailCard;
