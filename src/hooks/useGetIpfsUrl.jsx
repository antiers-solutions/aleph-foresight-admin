import { useState } from "react";
import UseGetApi from "./useGetApi";
import { apiMethods } from "../constant/constants";
import { customToast } from "../Common/Toast/toast";
import { apiUrls } from "../constant/apiConstants";

const useGenerateIpfsUrl = () => {
  const [ipfsUrl, setIpfsUrl] = useState("");

  const generateIpfsUrl = async (formData) => {
    const { crypto, price } = formData;
    try {
      const bodyData = {
        price,
        eventName: crypto,
        timeStamp: Date.now(),
      };
      const {
        data: { data },
      } = await UseGetApi(
        apiUrls.generateUrlForEventCreation,
        apiMethods.POST,
        bodyData
      );
      setIpfsUrl(data);
    } catch ({ message }) {
      customToast.error(message);
    }
  };

  return { ipfsUrl, generateIpfsUrl, setIpfsUrl };
};

export default useGenerateIpfsUrl;
