import { apiMethods } from "../constant/constants";
import UseGetApi from "../hooks/useGetApi";
import { customToast } from "../Common/Toast/toast";
import { apiUrls } from "../constant/apiConstants";
import { env } from "../constant/envConstant";
import { contractEvents } from "../utils/contractHelpers";

export const getCrypto = async (setCryptoList) => {
  try {
    const {
      data: {
        data: { Currency },
      },
    } = await UseGetApi(apiUrls.getCryptoListing, apiMethods.GET);
    const currency = Currency || [];

    setCryptoList(currency);
  } catch (error) {
    customToast.error(error.message);
  }
};

// Api call to fetch data from ipfs Urls like price, coin name
export const getDataFromIpfs = async (url) => {
  try {
    const { data } = await UseGetApi(
      env.ipfsUrl + url,
      apiMethods.GET,
      null,
      null,
      true
    );
    if (data) return data;
  } catch ({ message }) {
    customToast.error(message);
  }
};

//logout handler
export const handleLogout = async (setLoading = () => {}) => {
  setLoading(true);
  try {
    await UseGetApi(apiUrls.logout, apiMethods.GET);
    localStorage.clear();
    sessionStorage.clear();
    return true;
  } catch ({ message }) {
    customToast.error(message);
    return false;
  } finally {
    setLoading(false);
  }
};

// get event & platform fee
export const getFee = async (setIsLoading = () => {}, event) => {
  setIsLoading(true);
  try {
    const res = await contractEvents({
      eventName: event,
    });
    return res ? Number(res) / 100 : 0;
  } catch (err) {
    customToast.error(err?.message);
    return err;
  } finally {
    setIsLoading(false);
  }
};
