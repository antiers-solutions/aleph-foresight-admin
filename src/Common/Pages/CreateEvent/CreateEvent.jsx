import React, { useEffect, useState } from "react";
import "./CreateEvent.scss";
import EventSelect from "./EventSelect/EventSelect";
import PreviewEvent from "../../CommonDetailcard/PreviewEvent.jsx";
import InputCustom from "../../InputCustom/InputCustom";
import DatePicker from "../../DatePicker/DatePicker";
import CustomModal from "../../customModal/CustomModal";
import ButtonCustom from "../../ButtonCustom/ButtonCustom";
import SuccessFul from "./SuccessFul.jsx";
import {
  adminEventNames,
  apiMethods,
  createEventSuccess,
  editEventDecimalValue,
  editEventSuccess,
  priceRegex,
} from "../../../constant/constants.jsx";
import {
  getDaysAndHours,
  getTimeStamp,
  handleTargetDateChange,
} from "../../../helpers/commonTimeFunctions.jsx";
import {
  eventFormData,
  eventFormErrorData,
} from "../../../constant/structuralContants.jsx";
import { contractEvents } from "../../../utils/contractHelpers.jsx";
import useGenerateIpfsUrl from "../../../hooks/useGetIpfsUrl.jsx";
import { getCrypto } from "../../../helpers/commonApiHelpers.jsx";
import {
  checkEventEditable,
  convertLeadingZeros,
  errorSetterFunction,
  getCurrencyIconUrl,
} from "../../../helpers/commonHelpers.jsx";
import { customToast } from "../../Toast/toast.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Path } from "../../Routing/Constant/RoutePaths.jsx";
import UseGetApi from "../../../hooks/useGetApi.jsx";
import { apiUrls } from "../../../constant/apiConstants.jsx";
import { Skeleton } from "antd";
import dayjs from "dayjs";

function CreateEvent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const eventId = state?.eventId;
  const [disable, setDisable] = useState(false);
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(eventFormErrorData);
  const [formData, setFormData] = useState(eventFormData);
  const [showEventModal, setShowEventModal] = useState(false);
  const [publishDisable, setPublishDisable] = useState(false);
  const [showSuccesstModal, setShowSuccessModal] = useState(false);
  const { ipfsUrl, generateIpfsUrl, setIpfsUrl } = useGenerateIpfsUrl();
  const [eventFetching, setEventFetching] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // Close Preview Modal
  const closeEventModal = () => {
    setShowEventModal(false);
  };

  // Open Preview Modal
  const openSuccessModal = () => {
    setShowSuccessModal(true);
    setShowEventModal(false);
  };

  // Close Success Modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate(Path.EVENT);
  };

  // Form OnChange Handler
  const onChangeHandle = (e) => {
    const { name, value, iconUrl } = e.target;
    let updatedFormData = { ...formData };

    switch (name) {
      case "crypto":
        updatedFormData[name] = value;
        updatedFormData["cryptoIconUrl"] = iconUrl;
        break;
      case "price":
        // Convert leading zeros
        const convertedValue = convertLeadingZeros(value);
        if (priceRegex.test(convertedValue) || convertedValue === "") {
          updatedFormData[name] = convertedValue;
        }
        break;
      case "targetDate":
        if (!value) {
          updatedFormData[name] = "";
          updatedFormData["eventDurationDays"] = 0;
        } else {
          updatedFormData = handleTargetDateChange(value, updatedFormData);
        }
        break;
      default:
        updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  // Open Preview Modal & Generate Ipfs Url
  const handlePreviewClick = () => {
    let newErr = errorSetterFunction(formData);
    setError(newErr);
    const hasErrors = Object.values(newErr).some((error) => error !== "");

    if (!hasErrors) {
      setIpfsUrl("");
      !isEditable && generateIpfsUrl(formData);
      setShowEventModal(true);
    }
  };

  // Create / Edit Event Handler
  const createEditEvent = async () => {
    try {
      setIsLoading(true);
      setPublishDisable(true);
      let res;
      if (isEditable) {
        //edit event
        res = await contractEvents({
          eventName: adminEventNames.editEvent,
          expiryTime: getTimeStamp(formData?.targetDate), //To convert date into timestamp,
          price: formData?.price * 10 ** editEventDecimalValue,
          eventId: eventId,
        });
      } else {
        //create event
        res = await contractEvents({
          eventName: adminEventNames.registerEvent,
          expiryTime: getTimeStamp(formData?.targetDate), //To convert date into timestamp,
          ipfs: ipfsUrl,
        });
      }
      if (res?.length) {
        openSuccessModal();
        setFormData({ ...eventFormData, crypto: cryptoList[0]?.symbol });
      }
    } catch ({ message }) {
      customToast.error(message);
    } finally {
      setIsLoading(false);
      setPublishDisable(false);
    }
  };

  // Get Event Details via Event Id
  const getEventDetails = async () => {
    setEventFetching(true);
    try {
      if (cryptoList?.length) {
        const { data } = await UseGetApi(
          apiUrls.getEventDetails(eventId),
          apiMethods.GET
        );
        let event = data?.data?.eventsDetails[0];
        // Check if the event has expired
        const isEditAllowed =
          checkEventEditable(state?.createdAt) && event?.noBetYet;
        setIsEditable(isEditAllowed);
        if (!isEditAllowed) {
          // If expired, clear form data
          setFormData(eventFormData);
        } else {
          // If not expired, set form data
          const { gapInDays, gapInHours } = getDaysAndHours(
            event?.targetDateTime
          );
          // it will get currency icon url on basis of currency symbol
          const icon = getCurrencyIconUrl(
            cryptoList,
            event?.currencyDetails?.symbol
          );
          // set form data
          setFormData({
            crypto: event?.currencyDetails?.symbol,
            cryptoIconUrl: icon?.iconUrl,
            price: event?.priceLevel,
            targetDate: dayjs(event?.targetDateTime * 1000),
            betClosureTime: dayjs(event?.bettingClosureTime * 1000),
            eventDurationDays: gapInDays,
            eventDurationHours: gapInHours,
          });
        }
        setEventFetching(false);
      }
    } catch ({ message }) {
      customToast.error(message);
      setEventFetching(false);
    }
  };

  useEffect(() => {
    // fetch crypto currency listing
    const fetchData = async () => {
      await getCrypto(setCryptoList);
    };
    fetchData();
  }, []);

  // Set Errors for form
  useEffect(() => {
    const hasError = Object.values(error).some((errorMessage) => errorMessage);
    setDisable(hasError);
  }, [error]);

  // Handle Publish Button Disable based on Ipfs Url
  useEffect(() => {
    if (!isEditable) {
      setPublishDisable(!ipfsUrl);
    }
  }, [ipfsUrl]);

  // Handle Create & Edit Event Button Disable based on Ipfs Url
  useEffect(() => {
    if (disable) {
      let newErr = errorSetterFunction(formData);
      setError(newErr);
    }
  }, [disable, formData]);

  // Call get Event details api based on eventId length
  useEffect(() => {
    if (eventId) {
      getEventDetails();
    }
  }, [eventId, cryptoList]);

  return eventFetching ? (
    <Skeleton active paragraph={{ rows: 5 }} />
  ) : (
    <>
      <div className="createEvent">
        <div className="createEvent_top">
          <div className="createEvent_top_crypto date_error">
            {/* Choose Currency */}
            <label>Choose Crypto</label>
            <EventSelect
              onChangeHandle={onChangeHandle}
              name="crypto"
              value={formData?.crypto}
              cryptoList={cryptoList}
              isDisable={isEditable}
            />
            {error?.crypto ? (
              <p className="error_red">{error?.crypto}</p>
            ) : null}
          </div>

          {/* Choose Price */}
          <div className="createEvent_info date_error">
            <InputCustom
              label="Price Level"
              placeholder="Enter Price"
              regularInput
              name="price"
              onChange={onChangeHandle}
              value={formData?.price}
            />
            <p className="usdt">USDT</p>
            {error?.price ? <p className="error_red">{error?.price}</p> : null}
          </div>
        </div>

        {/* Target Date & Time */}
        <div className="createEvent_dateSecton">
          <div className="date_error width-50">
            <DatePicker
              label="Target Date & Time"
              name="targetDate"
              onChangeHandle={onChangeHandle}
              defaultValue={formData?.targetDate}
              value={formData?.targetDate}
            />
            {error?.targetDate ? (
              <p className="error_red">{error?.targetDate}</p>
            ) : null}
          </div>

          {/* Event Durations */}
          <div className="createEvent_dateSecton_duration">
            <div className="createEvent_info">
              <InputCustom
                label="Event Duration"
                placeholder="00"
                regularInput
                name="eventDurationDays"
                onChange={onChangeHandle}
                value={formData?.eventDurationDays}
                disabled={true}
              />
              <p className="usdt">
                {formData?.eventDurationDays > 1 ? "Days" : "Day"}
              </p>
            </div>
            <div className="createEvent_info">
              <InputCustom
                placeholder="00"
                label={<span className="empty">label</span>}
                regularInput
                name="eventDurationHours"
                onChange={onChangeHandle}
                value={formData?.eventDurationHours}
                disabled={true}
              />
              <p className="usdt">
                {formData?.eventDurationHours > 1 ? "Hours" : "Hour"}
              </p>
            </div>
          </div>
        </div>

        {/* Betting Closure Time */}
        <div>
          <DatePicker
            label="Betting Closure Date & Time"
            name="betClosureTime"
            defaultValue={formData?.betClosureTime}
            value={formData?.betClosureTime}
            disable={true}
          />
        </div>

        {/*Edit / Create Event Button  */}
        <div className="createEvent_btn">
          <ButtonCustom
            label={isEditable ? "Edit Event" : "Create Event"}
            onClick={handlePreviewClick}
            isDisabled={disable}
          />
        </div>
      </div>

      {/*Preview Modal  */}
      <CustomModal
        className="previewModal"
        visible={showEventModal}
        onClose={closeEventModal}
        title="Preview Your Event"
        content={
          <PreviewEvent
            onClick={createEditEvent}
            data={formData}
            closeEventModal={closeEventModal}
            disable={publishDisable}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        }
        width={540}
      />

      {/* Success Modal */}
      <CustomModal
        visible={showSuccesstModal}
        onClose={closeSuccessModal}
        title={false}
        content={
          <SuccessFul
            close={closeSuccessModal}
            content={isEditable ? editEventSuccess : createEventSuccess}
          />
        }
        width={520}
      />
    </>
  );
}

export default CreateEvent;
