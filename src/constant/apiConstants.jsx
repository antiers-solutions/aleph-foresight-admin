export const apiUrls = {
  getTotalUsers: "/user/getTotalUser",
  getTotalEvents: "/user/getTotalEvents",
  getTotalTransactions: "/admin/getTotalTransaction",
  getTotalVolume: "/user/getTotalVolume",
  getTotalDisputes: "/admin/getTotalDispute",
  getTotalCreators: "/admin/getTotalEventCreators",
  setPlatformFee: "/admin/setPlateformFees",
  setEventCreationFee: "/admin/eventCreationFees",
  generateUrlForEventCreation: "/contract/createIpfsUrl",
  createEvent: "/admin/eventCreate",
  connectWallet: "/admin/adminLogin",
  getCryptoListing: "/currency/getTopMarket",
  logout: "/admin/logout",

  getEventDetails: (eventId) => `/admin/getEventDetails?eventId=${eventId}`,

  //apis with pagination
  getUsersCreatorsListing: (page, limit, tab) => {
    return tab === "0"
      ? `/admin/getUser?page=${page || undefined}&limit=${limit || undefined}`
      : tab === "1"
      ? `/admin/getEventsCreators?page=${page || undefined}&limit=${
          limit || undefined
        }`
      : null;
  },
  getClosedEvents: (page, limit, tab, filter) => {
    return `/admin/getClosedPosition?page=${page || undefined}&limit=${
      limit || undefined
    }&status=${tab || "1"}&filter=${filter || "all"}`; //0 = closed status, 1 = open status
  },
  getDisputes: (page, limit) => {
    return `/admin/getDisputeRaise?page=${page}&limit=${limit}`;
  },
};
