// Settings.js
import React, { useState } from "react";
import { PlateformFee, EventFee } from "../../../assets/svgImages/StoreAsset";
import SecurityQuestions from "./SecurityQuestions";
import "./Settings.scss";
import SidebarCard from "../../cards/SidebarCard";
import CustomModal from "../../customModal/CustomModal.jsx";
import PlateformContent from "./PlateformContent";
import EventCreate from "./EventCreate.jsx";

function Settings() {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showSecurityQuestionsModal, setShowSecurityQuestionsModal] =
    useState(false);

  const openModal = (id) => {
    setSelectedCardId(id);
  };

  const closeModal = () => {
    setSelectedCardId(null);
  };

  const closeSecurityQuestionsModal = () => {
    setShowSecurityQuestionsModal(false);
  };
  const openResetModal = () => {
    setShowSecurityQuestionsModal(false);
  };

  const cardData = [
    {
      id: 1,
      imageSrc: <PlateformFee />,
      paragraph: "Platform Fee",
    },
    {
      id: 2,
      imageSrc: <EventFee />,
      paragraph: "Event Creation Rewards",
    },
  ];

  return (
    <>
      <div className="settings">
        <div className="settings__cards">
          {cardData.map((card, index) => (
            <div onClick={() => openModal(card.id)} key={index}>
              <SidebarCard
                key={card.id}
                imageSrc={card.imageSrc}
                heading={card.heading}
                paragraph={card.paragraph}
              />
            </div>
          ))}
        </div>
        {selectedCardId === 1 ? (
          <CustomModal
            visible={selectedCardId === 1}
            onClose={closeModal}
            title="Platform Fee Details"
            content={<PlateformContent closeModal={closeModal} />}
            width={514}
          />
        ) : (
          <CustomModal
            visible={selectedCardId === 2}
            onClose={closeModal}
            title="Event Creation Rewards"
            content={<EventCreate closeModal={closeModal} />}
            width={514}
          />
        )}
      </div>
      <CustomModal
        visible={showSecurityQuestionsModal}
        onClose={closeSecurityQuestionsModal}
        title="Verify Your Email"
        content={<SecurityQuestions onClick={openResetModal} />}
        width={514}
      />
    </>
  );
}

export default Settings;
