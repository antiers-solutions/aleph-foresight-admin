import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import "./UserManagement.scss";
import { userManagementTabItem } from "../../../constant/tabsItems";
import UseGetApi from "../../../hooks/useGetApi";
import { apiMethods, tableLimit } from "../../../constant/constants";
import { customToast } from "../../Toast/toast";
import { apiUrls } from "../../../constant/apiConstants";

function UserMangement() {
  const [userData, setUserData] = useState({ users: [], count: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState("0");

  useEffect(() => {
    handleUsersCreatorsListing();
  }, [currentPage, tab]);

  const handleUsersCreatorsListing = async () => {
    setIsLoading(true);
    try {
      const { data } = await UseGetApi(
        `${apiUrls.getUsersCreatorsListing(currentPage, tableLimit, tab)}`,
        apiMethods.GET
      );
      setUserData({ users: data?.data?.users, count: data?.data?.total });
    } catch ({ message }) {
      setUserData({ users: [], count: 0 });
      customToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // page change handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //tab change handler
  const handleTabChange = (e) => {
    setCurrentPage(1);
    setTab(e);
  };

  return (
    <div className="UserCreate">
      <Tabs
        defaultActiveKey="0"
        className="commonTab"
        items={userManagementTabItem(
          currentPage,
          userData,
          handlePageChange,
          isLoading
        )}
        onChange={handleTabChange}
        value={tab}
      />
    </div>
  );
}

export default UserMangement;
