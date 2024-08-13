import React from "react";
import {
  TotalVolume,
  ActiveEvents,
  TotalEvents,
  TotalTrans,
  Committee,
  CreateEvent,
  Dashboard,
  Disputes,
  Event,
  Management,
  Setting,
  RevenueGenerated,
  NumberUsers,
  NumberCreators,
  AmountStaked,
} from "../assets/svgImages/StoreAsset";
import { Tooltip } from "antd";
import moment from "moment";
import {
  DatePickerFormat,
  EventDateFormat,
  InTableDateFormat,
} from "./constants";
import { defClosureDate, defTargetDate } from "../helpers/commonTimeFunctions";
import trimAddressLength, {
  CapitalizeFirstLetter,
} from "../helpers/commonHelpers";
import CopyText from "../Common/CopyText";
import { Path } from "../Common/Routing/Constant/RoutePaths";
import { env } from "./envConstant";

export const cardsHeadings = [
  {
    id: 1,
    imageSrc: <ActiveEvents />,
    paragraph: "Active Events",
    key: "totalActiveEvent",
  },
  {
    id: 2,
    imageSrc: <TotalEvents />,
    paragraph: "Total Events",
    key: "totalEvents",
  },
  {
    id: 3,
    imageSrc: <TotalVolume />,
    paragraph: `Total Volume (${env.adminCurrencyName})`,
    key: "totalVolume",
  },
  {
    id: 4,
    imageSrc: <TotalTrans />,
    paragraph: "Total Transactions",
    key: "transactionData",
  },
  {
    id: 5,
    imageSrc: <RevenueGenerated />,
    paragraph: `Revenue (${env.adminCurrencyName})`,
    key: "totalRewards",
  },
];

export const eventHeadings = [
  {
    id: 1,
    imageSrc: <NumberUsers />,
    paragraph: "Number of Users",
    key: "totalUsers",
  },
  {
    id: 2,
    imageSrc: <NumberCreators />,
    paragraph: "Number of Creators",
    key: "totalCreators",
  },
  {
    id: 3,
    imageSrc: <AmountStaked />,
    paragraph: "Amount Staked",
    key: "noOfCommittee",
  },
  {
    id: 4,
    imageSrc: <NumberUsers />,
    paragraph: "Number of Stakers",
    key: "noOfOracles",
  },
  {
    id: 5,
    imageSrc: <ActiveEvents />,
    paragraph: "Disputes Raised",
    key: "total",
  },
];

export const graphOptions = [
  { value: "daily", label: "30 days" },
  { value: "weekly", label: "7 days" },
];

export const EventManagementOptions = [
  { value: "all", label: "All Events" },
  { value: "admin", label: "Admin Created" },
  { value: "user", label: "User Created" },
];

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const sidebarMenuItems = [
  {
    tip: "Dashboard",
    text: "Dashboard",
    link: Path.DASHBOARD,
    icon: (
      <Tooltip placement="topRight" title="Dashboard">
        <Dashboard />
      </Tooltip>
    ),
  },
  {
    tip: "User Management",
    text: "User Management",
    link: Path.USER,
    icon: <Management />,
  },
  {
    tip: "Event Management",
    text: "Event Management",
    link: Path.EVENT,
    icon: <Event />,
  },
  {
    tip: "Create Event",
    text: "Create Event",
    link: Path.CREATE,
    icon: <CreateEvent />,
  },
  // {
  //   tip: "Arbitration Committee",
  //   text: "Arbitration Committee",
  //   link: Path.ARBITRATION,
  //   icon: <Committee />,
  // },
  // {
  //   tip: "Disputes Raised",
  //   text: "Disputes Raised",
  //   link: Path.DISPUTES,
  //   icon: <Disputes />,
  // },
  {
    tip: "Settings",
    text: "Settings",
    link: Path.SETTINGS,
    icon: <Setting />,
  },
];

export const eventFormData = {
  crypto: "",
  cryptoIconUrl: "",
  price: "",
  targetDate: defTargetDate,
  betClosureTime: defClosureDate,
  eventDurationDays: 1,
  eventDurationHours: 0,
  // description: "",
};

export const eventFormErrorData = {
  crypto: "",
  price: "",
  targetDate: "",
  // description: "",
};

export const previewCardData = (data) => [
  {
    id: 1,
    heading: "Betting Crypto",
    paragraph: data?.crypto ? (
      <span className="cryptoIcon">
        <img src={data?.cryptoIconUrl || ""} /> &nbsp;
        {data?.crypto || "-"}
      </span>
    ) : null,
  },
  {
    id: 2,
    heading: "Price Level",
    paragraph: `${+data?.price || 0} USDT`,
  },
  {
    id: 3,
    heading: "Target Date & Time",
    paragraph: `${moment(data?.targetDate?.$d).format(DatePickerFormat)}`,
  },
  {
    id: 4,
    heading: "Event Duration",
    paragraph: `${data?.eventDurationDays || 0} Day${
      data?.eventDurationDays > 1 ? "s" : ""
    } | ${data?.eventDurationHours || 0} Hour${
      data?.eventDurationHours > 1 ? "s" : ""
    }`,
  },
  {
    id: 5,
    heading: "Betting Closure Date & Time",
    paragraph: `${moment(data?.betClosureTime?.$d).format(DatePickerFormat)}`,
  },
];

export const disputeCardData = (modalData) => [
  {
    id: 1,
    heading: "Event",
    paragraph: Object.keys(modalData)?.length ? (
      <span className="bitdata">
        {modalData?.name} to be priced at {modalData?.price} USDT or more as on{" "}
        {moment.unix(modalData?.targetDateTime).format(EventDateFormat)} ?
      </span>
    ) : (
      "-"
    ),
  },
  {
    id: 2,
    heading: "Wallet Address",
    paragraph: modalData?.userId ? (
      <span className="cursorPointer bitdata" title={modalData?.userId}>
        {trimAddressLength(modalData?.userId, 8, 8)}{" "}
        <CopyText text={modalData?.userId}></CopyText>
      </span>
    ) : (
      "-"
    ),
  },
  {
    id: 3,
    heading: "Category",
    paragraph: (
      <span className="bitdata">
        {CapitalizeFirstLetter(modalData?.category) || "-"}
      </span>
    ),
  },
  {
    id: 4,
    heading: "Date & Time",
    paragraph: (
      <span className="bitdata">
        {modalData?.createdAt
          ? moment(modalData?.createdAt).format(InTableDateFormat)
          : "-"}
      </span>
    ),
  },
  {
    id: 5,
    heading: "Status",
    paragraph: modalData?.status ? (
      <span
        className={
          modalData?.status === "closed" ? "red bitdata" : "green bitdata"
        }
      >
        {CapitalizeFirstLetter(modalData?.status)}
      </span>
    ) : (
      "-"
    ),
  },
  {
    // for now it will remain static
    id: 6,
    heading: "Claim Decision",
    paragraph: <span className="green bitdata">Accepted</span>,
  },
  // {
  //   //for now we will show evidence count
  //   id: 7,
  //   heading: "Evidence uploaded (IPFS)",
  //   paragraph: (
  //     <span className="uploaded">
  //       <ArticleIcon /> {modalData?.evidaenceUrl?.length || 0}
  //     </span>
  //   ),
  // },
];
