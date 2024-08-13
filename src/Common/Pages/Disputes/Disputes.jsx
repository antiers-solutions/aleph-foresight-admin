import React, { useEffect, useState } from "react";
import DisputeTable from "./DisputeTable";
import CustomModal from "../../customModal/CustomModal";
import CommonDetailCard from "../../CommonDetailcard/CommonDetailCard";
import UseGetApi from "../../../hooks/useGetApi";
import { apiUrls } from "../../../constant/apiConstants";
import { apiMethods, tableLimit } from "../../../constant/constants";
import { customToast } from "../../Toast/toast";
import { getDataFromIpfs } from "../../../helpers/commonApiHelpers";

function Disputes() {
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [disputesData, setDisputesData] = useState({ disputes: [], count: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [ipfsData, setIpfsData] = useState([]);
  const [modalData, setModalData] = useState({});

  const handleDisputesListing = async () => {
    setIsLoading(true);
    try {
      const { data } = await UseGetApi(
        apiUrls.getDisputes(currentPage, tableLimit),
        apiMethods.GET
      );
      setDisputesData({
        disputes: data?.data?.disputeData,
        count: data?.data?.total,
      });
    } catch ({ message }) {
      customToast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  //Call disputes api handler
  useEffect(() => {
    handleDisputesListing();
  }, [currentPage]);

  //   Get Events data from ipfs url
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const ipfsPromises = disputesData?.disputes?.map((item) =>
          getDataFromIpfs(item?.eventId)
        );
        const ipfsDataArray = await Promise.all(ipfsPromises);
        // combine disputes data with the data fetched from ipfs url
        const combinedEventsData = disputesData?.disputes?.map(
          (event, index) => ({
            ...event,
            ...ipfsDataArray[index],
          })
        );

        setIpfsData(combinedEventsData);
      } catch ({ message }) {
        customToast.error(message);
      }
    };
    if (disputesData?.disputes?.length) {
      fetchDetails();
    }
  }, [disputesData?.disputes]);

  // change page handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const openDisputeModal = (index) => {
    setShowDisputeModal(true);
    setModalData(ipfsData[index]);
  };

  const closeDisputeModal = () => {
    setShowDisputeModal(false);
  };

  return (
    <div>
      <DisputeTable
        openModal={openDisputeModal}
        handlePageChange={handlePageChange}
        ipfsData={ipfsData}
        isLoading={isLoading}
        currentPage={currentPage}
        disputesData={disputesData}
      />
      <CustomModal
        visible={showDisputeModal}
        onClose={closeDisputeModal}
        title="Dispute Details"
        content={<CommonDetailCard modalData={modalData} />}
        width={631}
      />
    </div>
  );
}

export default Disputes;
