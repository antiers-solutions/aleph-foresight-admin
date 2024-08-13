import React from "react";
import { Skeleton, Table } from "antd";
import { tableLimit } from "./constants";
import {
  closedAndOpenEventsColumns,
  getCreatorsTableColumns,
  getUserTableColumns,
} from "./tableColumns";

export const eventManagementTabItem = (
  currentPage,
  ipfsData,
  eventsData,
  handlePageChange,
  isLoading,
  userRegisterFilter,
  handleEdit
) => [
  {
    label: <span>Open</span>,
    key: "1",
    children: isLoading ? (
      <div className="no-events-found">
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    ) : (
      <Table
        columns={closedAndOpenEventsColumns(userRegisterFilter, handleEdit)}
        dataSource={ipfsData}
        pagination={
          eventsData?.count > tableLimit && ipfsData?.length
            ? {
                current: currentPage,
                pageSize: tableLimit,
                total: eventsData?.count,
                onChange: handlePageChange,
                showSizeChanger: false,
              }
            : false
        }
        className="commontable"
      />
    ),
  },
  {
    label: <span>Closed</span>,
    key: "0",
    children: isLoading ? (
      <div className="no-events-found">
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    ) : (
      <Table
        columns={closedAndOpenEventsColumns()}
        dataSource={ipfsData}
        pagination={
          eventsData?.count > tableLimit && ipfsData?.length
            ? {
                current: currentPage,
                pageSize: tableLimit,
                total: eventsData?.count,
                onChange: handlePageChange,
                showSizeChanger: false,
              }
            : false
        }
        className="commontable"
      />
    ),
  },
];

export const userManagementTabItem = (
  currentPage,
  userData,
  handlePageChange,
  isLoading
) => [
  {
    label: <span>Users</span>,
    key: "0",
    children: isLoading ? (
      <div className="no-events-found">
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    ) : (
      <Table
        columns={getUserTableColumns()}
        dataSource={userData?.users}
        pagination={
          userData?.count > tableLimit && userData?.users?.length
            ? {
                current: currentPage,
                pageSize: tableLimit,
                total: userData?.count,
                onChange: handlePageChange,
                showSizeChanger: false,
              }
            : false
        }
        className="commontable"
      />
    ),
  },
  {
    label: <span>Creators</span>,
    key: "1",
    children: isLoading ? (
      <div className="no-events-found">
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    ) : (
      <Table
        columns={getCreatorsTableColumns(currentPage)}
        dataSource={userData?.users}
        pagination={
          userData?.count > tableLimit && userData?.users?.length
            ? {
                current: currentPage,
                pageSize: tableLimit,
                total: userData?.count,
                onChange: handlePageChange,
                showSizeChanger: false,
              }
            : false
        }
        className="commontable"
      />
    ),
  },
];
