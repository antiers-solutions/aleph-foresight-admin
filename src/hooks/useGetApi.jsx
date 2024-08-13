import axios from "axios";
import { apiMethods } from "../constant/constants";
import { env } from "../constant/envConstant";
import { customToast } from "../Common/Toast/toast";

const UseGetApi = async (
  url,
  method,
  body,
  additionalHeaders,
  isIpfs = false
) => {
  try {
    const result = await axios({
      method: method || apiMethods.GET,
      url: !isIpfs ? env.apiUrl + url : url,
      data: body || undefined,
      withCredentials: !isIpfs,
      headers: additionalHeaders,
    });
    return result;
  } catch (error) {
    const { response } = error;
    const message = response?.data?.message || error?.message;
    customToast.error(message);
    if (message === "Unauthorized!") {
      localStorage.clear();
      window.location.href = "/login";
    }
  }
};

export default UseGetApi;
