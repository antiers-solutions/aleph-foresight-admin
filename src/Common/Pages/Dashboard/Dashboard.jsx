import React, { useEffect, useState } from "react";
import SidebarCard from "../../cards/SidebarCard";
import "./Dashboard.scss";
import UseGetApi from "../../../hooks/useGetApi";
import { adminEventNames, apiMethods } from "../../../constant/constants";
import {
  cardsHeadings,
  eventHeadings,
} from "../../../constant/structuralContants";
import { customToast } from "../../Toast/toast";
import { apiUrls } from "../../../constant/apiConstants";
import { contractEvents } from "../../../utils/contractHelpers";

function Dashboard() {
  const [cardsData, setCardData] = useState({
    totalActiveEvent: "",
    totalEvents: "",
    totalUsers: "",
    transactionData: "",
    totalVolume: "",
    total: "",
    totalCreators: "",
    noOfCommittee: "",
    noOfOracles: "",
    totalRewards: "",
  });

  // Fetch Revenue Generated
  const fetchData = async () => {
    try {
      const res = await contractEvents({
        eventName: adminEventNames.getTotalRewards,
      });
      let rewards = Number(res) / 10 ** 18;
      setCardData((prevCardsData) => ({
        ...prevCardsData,
        totalRewards: rewards,
      }));
    } catch (err) {
      return err;
    }
  };

  const apiHandler = async (url, ...key) => {
    try {
      const { data } = await UseGetApi(url, apiMethods.GET);
      if (data?.data) {
        setCardData((prevCardsData) =>
          key[1]
            ? {
                ...prevCardsData,
                [key[0]]: data?.data[key[0]],
                [key[1]]: data?.data[key[1]],
              }
            : {
                ...prevCardsData,
                [key[0]]: data?.data[key[0]],
              }
        );
      }
    } catch ({ message }) {
      customToast.error(message);
    }
  };

  useEffect(() => {
    apiHandler(apiUrls.getTotalEvents, "totalEvents", "totalActiveEvent"); //get total & active events
    apiHandler(apiUrls.getTotalUsers, "totalUsers"); //get total no. of users
    apiHandler(apiUrls.getTotalTransactions, "transactionData"); //get total no. of transactions
    apiHandler(apiUrls.getTotalVolume, "totalVolume"); //get total volume
    apiHandler(apiUrls.getTotalDisputes, "total"); //get total Disputes
    apiHandler(apiUrls.getTotalCreators, "totalCreators"); //get total Creators
    fetchData();
  }, []);

  return (
    <div className="dashboardSummary">
      <h3>Summary</h3>
      <div className="dashboardSummary__card">
        {cardsHeadings?.map((card) => (
          <SidebarCard
            imageSrc={card?.imageSrc}
            key={card?.id}
            heading={cardsData[card?.key] || 0}
            paragraph={card?.paragraph}
            comp="dashboard"
          />
        ))}
      </div>
      <div
        className="dashboardSummary__revenue__cards dashboardSummary__card"
        style={{ marginTop: "25px" }}
      >
        {eventHeadings?.map((card) => (
          <SidebarCard
            key={card?.id}
            imageSrc={card?.imageSrc}
            heading={cardsData[card?.key] || 0}
            paragraph={card?.paragraph}
            comp="dashboard"
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
