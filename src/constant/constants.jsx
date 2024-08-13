import { env } from "./envConstant";

export const maxPriceLevel = 1000000;
export const minPriceLevel = 0.1;

export const regex = /^(50(\.0{0,2})?|([0-4]?\d(\.\d{0,2})?))?$/;
export const eventRegex = /^(100(\.0{0,2})?|([0-9]?\d(\.\d{0,2})?))?$/;

export const priceRegex =
  /^$|^(([1-9]?\d{0,5}|1000000)(\.\d{0,7})?|([0]\.\d{1,7}))$/;

export const DatePickerFormat = "YYYY-MM-DD | HH:00:00";
export const EventDateFormat = "Do MMMM YYYY , hh:mm A";
export const InTableDateFormat = "YYYY-MM-DD | hh:mm:ss";
export const targetClosureDateFormat = "YYYY-MM-DD HH";

export const tableLimit = 10;

export const decimalValue = 18;

export const messages = {
  //Metamask
  Install_Wallet: `Please install the Metamask. If installed, refresh your browser.`,
  Retrive_Meta_Account: `Cannot retrieve any account. Please refresh the browser`,
  Same_Network: `You are already on the ${env.chainName} network.`,
  Successfully_Switched: `You have successfully switched to ${env.chainName} network.`,
  Network_Added: `You have successfully switched to ${env.chainName} network.`,
  Network_Add_Error: `Error adding ${env.chainName} network: `,
};

export const adminEventNames = {
  registerEvent: "register_event",
  setEventFees: "set_creation_fee_event",
  setPlatformFee: "set_platform_fee",
  getPlatformFee: "get_platform_fee",
  getEventFee: "get_creation_fee",
  readPoolAmount: "read_pool_amount_event",
  getTotalRewards: "get_admin_total_reward",
  editEvent: "edit_expiration_time_event",
};

export const apiMethods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export const createEventSuccess = "Your event has been created successfully";
export const editEventSuccess = "Your event has been edited successfully";
export const platformFeeTooltip =
  "Ensures that platform remains operational and updated.";

export const editEventDecimalValue = 7;
export const priceDecimalValue = 18;
