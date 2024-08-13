import {
  InTableDateFormat,
  decimalValue,
  priceDecimalValue,
} from "./constants";
import CopyText from "../Common/CopyText";
import moment from "moment";
import trimAddressLength, {
  CapitalizeFirstLetter,
  checkEventEditable,
  eventNameHandler,
  toPrecise,
} from "../helpers/commonHelpers";
import { Link } from "react-router-dom";
import { env } from "./envConstant";
import { Tooltip } from "antd";
import { isLoggedIn } from "../utils/walletHelpers";

const address = isLoggedIn();

export const getUserTableColumns = () => [
  {
    id: "userId",
    title: "User Id",
    key: "userId",
    dataIndex: "_id",
    render: (text) =>
      text ? (
        <Tooltip title={text}>
          <span>{trimAddressLength(text, 6, 6)}</span>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    id: "walletAddress",
    title: "Wallet Address",
    dataIndex: "walletAddress",
    key: "walletAddress",
    render: (text) =>
      text ? (
        <span>
          <Link
            to={`${env.explorerNavigationUrl}address/${text}`}
            target="_blank"
          >
            {" "}
            {text}{" "}
          </Link>
          <CopyText text={text}></CopyText>
        </span>
      ) : (
        "-"
      ),
  },
  {
    id: "noOfBets",
    title: "No. Of Bets",
    dataIndex: "noOfBets",
    key: "noOfBets",
    render: (text) => (text ? text : "0"),
  },
  {
    id: "disputesRaised",
    title: "Disputes Raised",
    dataIndex: "disputesRaised",
    key: "disputesRaised",
    render: (text) => (text ? text : "0"),
  },
  {
    id: "dateOfJoin",
    title: "Date of Joining",
    dataIndex: "createdAt",
    key: "dateOfJoin",
    render: (text) => (text ? moment(text).format(InTableDateFormat) : "-"),
  },
];

export const getCreatorsTableColumns = () => [
  {
    id: "userId",
    title: "User Id",
    key: "userId",
    dataIndex: "_id",
    render: (text) =>
      text ? (
        <Tooltip title={text}>
          <span>{trimAddressLength(text, 6, 6)}</span>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    id: "walletAddress",
    title: "Wallet Address",
    dataIndex: "walletAddress",
    key: "walletAddress",
    render: (text) =>
      text ? (
        <span>
          <Link
            to={`${env.explorerNavigationUrl}address/${text}`}
            target="_blank"
          >
            {" "}
            {text}{" "}
          </Link>{" "}
          <CopyText text={text}></CopyText>
        </span>
      ) : (
        "-"
      ),
  },
  {
    id: "noOfEvent",
    title: "No. of Events Created",
    dataIndex: "noOfEvents",
    key: "noOfEvent",
    render: (text) => (text ? text : "0"),
  },
  {
    id: "rewardsEarn",
    title: "Rewards Earned",
    dataIndex: "rewards",
    key: "rewardsEarn",
    render: (text) => (
      <span>
        {text
          ? toPrecise(+text / 10 ** priceDecimalValue, 4) + " AZERO"
          : "0 AZERO"}
      </span>
    ),
  },
  {
    id: "dateOfJoin",
    title: "Date of Joining",
    dataIndex: "createdAt",
    key: "dateOfJoin",
    render: (text) => (text ? moment(text).format(InTableDateFormat) : "-"),
  },
];

export const closedAndOpenEventsColumns = (userRegisterFilter, handleEdit) => [
  {
    id: "txHash",
    title: "Tx Hash",
    key: "txHash",
    dataIndex: "txnId",
    render: (text) =>
      text ? (
        <Tooltip title={text}>
          <Link to={`${env.explorerNavigationUrl}tx/${text}`} target="_blank">
            {" "}
            {trimAddressLength(text, 6, 6)}
          </Link>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    id: "eventId",
    title: "Event Id",
    key: "eventId",
    dataIndex: "eventId",
    render: (text) =>
      text ? (
        <Tooltip title={text}>
          {/* <Link
            to={`${env.userPanelNavigation}auth/aboutmarketplace/yes/${text}`}
            target="_blank"
          >
            {" "} */}
          {trimAddressLength(text, 6, 6)}
          {/* </Link>{" "} */}
        </Tooltip>
      ) : (
        "-"
      ),
  },

  {
    id: "event",
    title: "Event",
    // dataIndex: "event",
    key: "event",
    render: (text) =>
      Object.keys(text)?.length ? (
        <div className="editEvent">
          <Tooltip
            title={eventNameHandler(
              text?.name,
              text?.priceLevel,
              text?.targetDateTime
            )}
          >
            <span>
              {trimAddressLength(
                eventNameHandler(
                  text?.name,
                  text?.priceLevel,
                  text?.targetDateTime
                ),
                35,
                15
              )}
            </span>
          </Tooltip>
          {userRegisterFilter !== "user" &&
          text?.userId === address &&
          text?.noBetYet === true &&
          checkEventEditable(text?.createdAt) ? (
            <i
              class="fa fa-pencil edit"
              onClick={() =>
                handleEdit(text?.eventId, text?.createdAt, text?.noBetYet)
              }
              title="Edit Event"
            ></i>
          ) : null}
        </div>
      ) : (
        "-"
      ),
  },

  {
    id: "volume",
    title: `Volume`,
    dataIndex: "totalAmount",
    key: "volume",
    render: (text) => (
      <span title={+text / 10 ** decimalValue}>
        {(text ? toPrecise(+text / 10 ** decimalValue, 4) : "0") +
          " " +
          env?.adminCurrencyName}
      </span>
    ),
  },
  {
    id: "noOfTransactions",
    title: "No. of Transactions",
    dataIndex: "transactionCount",
    key: "noOfTransactions",
    render: (text) => text || "0",
  },
  {
    id: "createdAt",
    title: "Created On",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text) => (text ? moment(text).format(InTableDateFormat) : "-"),
  },
];

export const getDisputesColumns = (openModal) => [
  {
    id: "eventId",
    title: "Event Id",
    key: "eventId",
    dataIndex: "eventId",
    render: (text) =>
      text ? (
        <Tooltip title={text}>
          {/* <Link
            to={`${env.userPanelNavigation}auth/aboutmarketplace/yes/${text}`}
            target="_blank"
          > */}{" "}
          {trimAddressLength(text, 6, 6)}
          {/* </Link>{" "} */}
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    id: "event",
    title: "Event",
    key: "event",
    render: (text) =>
      Object.keys(text)?.length ? (
        <Tooltip
          title={eventNameHandler(
            text?.name,
            text?.price,
            text?.targetDateTime
          )}
        >
          <span>
            {trimAddressLength(
              eventNameHandler(text?.name, text?.price, text?.targetDateTime),
              19,
              15
            )}
          </span>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    id: "walletAddress",
    title: "Wallet Address",
    dataIndex: "userId",
    key: "walletAddress",
    render: (text) =>
      text ? (
        <Tooltip title={text}>
          <Link
            to={`${env.explorerNavigationUrl}address/${text}`}
            target="_blank"
          >
            {" "}
            {trimAddressLength(text, 6, 6)}
          </Link>{" "}
          <CopyText text={text}></CopyText>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    id: "category",
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => (text ? CapitalizeFirstLetter(text) : "0"),
  },

  {
    id: "status",
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => (text ? CapitalizeFirstLetter(text) : "0"),
  },
  {
    id: "createdAt",
    title: "Date & Time",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => (text ? moment(text).format(InTableDateFormat) : "-"),
  },
  {
    id: "action",
    title: "Action",
    dataIndex: "action",
    key: "Action",
    render: (text, record, index) => (
      <Link to="#" className="action" onClick={() => openModal(index)}>
        View Details
      </Link>
    ),
  },
];
