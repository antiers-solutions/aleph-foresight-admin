import React, { useEffect, useState } from "react";
import { Tabs, Select } from "antd";
import "./EventManagement.scss";
import { EventManagementOptions } from "../../../constant/structuralContants";
import { apiMethods, tableLimit } from "../../../constant/constants";
import UseGetApi from "../../../hooks/useGetApi";
import { getDataFromIpfs } from "../../../helpers/commonApiHelpers";
import { eventManagementTabItem } from "../../../constant/tabsItems";
import { customToast } from "../../Toast/toast";
import { apiUrls } from "../../../constant/apiConstants";
import { Path } from "../../Routing/Constant/RoutePaths";
import { useNavigate } from "react-router";

function EventManagement() {
  const [tab, setTab] = useState("1");
  const [ipfsData, setIpfsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eventsData, setEventsData] = useState({ events: [], count: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [userRegisterFilter, setUserRegisterFilter] = useState("all"); //admin,user,all
  const navigate = useNavigate();

  // Filter for admin or user events
  const operations = (
    <Select
      className="eventSelectItem"
      value={userRegisterFilter}
      onChange={(e) => {
        setUserRegisterFilter(e);
      }}
      menuisopen={"true"}
      options={EventManagementOptions}
    />
  );

  // change page handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //tab change handler
  const handleTabChange = (e) => {
    setCurrentPage(1);
    setTab(e);
  };

  // open & closed events api handler
  const handleClosedOpenEvents = async () => {
    setIsLoading(true);
    try {
      const { data } = await UseGetApi(
        apiUrls.getClosedEvents(
          currentPage,
          tableLimit,
          tab,
          userRegisterFilter
        ),
        apiMethods.GET
      );
      setEventsData({
        events: data?.data?.ordersData,
        count: data?.data?.total,
      });
    } catch ({ message }) {
      setEventsData({ events: [], count: 0 });
      customToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  //Call events api handler
  useEffect(() => {
    handleClosedOpenEvents();
  }, [currentPage, tab, userRegisterFilter]);

  // Reset Page Number on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [userRegisterFilter]);

  // get Event Details from ipfsUrl
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const ipfsPromises = eventsData?.events?.map((item) =>
          getDataFromIpfs(item?.eventId)
        );
        const ipfsDataArray = await Promise.all(ipfsPromises);
        // combine events data with the data fteched from ipfs url
        const combinedEventsData = eventsData?.events?.map((event, index) => ({
          ...event,
          ...ipfsDataArray[index],
        }));

        setIpfsData(combinedEventsData);
      } catch ({ message }) {
        customToast.error(message);
      }
    };
    // call Fetch Details function
    if (eventsData?.events?.length) {
      fetchDetails();
    } else {
      setIpfsData([]);
    }
  }, [eventsData?.events]);

  // Edit button navigation
  const handleEdit = (id, date, noBetYet) => {
    let data = { eventId: id, createdAt: date, noBetYet: noBetYet };
    navigate(Path.CREATE, { state: data });
  };

  return (
    <div className="eventManagement">
      <Tabs
        defaultActiveKey="1"
        className="commonTab"
        items={eventManagementTabItem(
          currentPage,
          ipfsData,
          eventsData,
          handlePageChange,
          isLoading,
          userRegisterFilter,
          handleEdit
        )}
        onChange={handleTabChange}
        value={tab}
        tabBarExtraContent={operations}
      />
    </div>
  );
}

export default EventManagement;
