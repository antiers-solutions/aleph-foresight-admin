import React from "react";
import { Skeleton, Table } from "antd";
import { getDisputesColumns } from "../../../constant/tableColumns";
import { tableLimit } from "../../../constant/constants";
import Loader from "../../Loader";

function DisputeTable({
  openModal,
  handlePageChange,
  ipfsData,
  isLoading,
  currentPage,
  disputesData,
}) {
  return isLoading ? (
    <div className="no-events-found">
      <Skeleton active paragraph={{ rows: 4 }} />
    </div>
  ) : (
    <Table
      columns={getDisputesColumns(openModal)}
      dataSource={ipfsData}
      pagination={
        disputesData?.count > tableLimit && ipfsData?.length
          ? {
              current: currentPage,
              pageSize: tableLimit,
              total: disputesData?.count,
              onChange: handlePageChange,
            }
          : false
      }
      className="commontable"
    />
  );
}

export default DisputeTable;
