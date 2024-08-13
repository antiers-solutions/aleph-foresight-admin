import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import {
  InTableDateFormat,
  targetClosureDateFormat,
} from "../constant/constants";

dayjs.extend(customParseFormat);

export const handleTargetDateChange = (targetDate, formData) => {
  const { gapInDays, gapInHours } = getDaysAndHours(targetDate);
  const hoursToMinusForBetting = gapInDays >= 2 ? 24 : 12;
  let newClosureDate = antdTimeFormat(
    new Date(targetDate),
    hoursToMinusForBetting,
    "minusHours"
  );

  return {
    ...formData,
    betClosureTime: newClosureDate || formData?.betClosureTime,
    eventDurationDays: gapInDays,
    eventDurationHours: gapInHours,
    targetDate: targetDate,
  };
};

// Calculate the Event Duration in Hours & Days
export const getDaysAndHours = (target) => {
  const startTime = new Date();
  // Extract the Date object if target is an object with a $d property
  const endTime =
    target && target.$d ? new Date(target.$d) : timeStampToDate(target);

  let gapInDays = 0;
  let gapInHours = 0;
  // Calculate the difference in milliseconds
  const differenceInMs = endTime - startTime;

  // Check if endTime is after startTime
  if (differenceInMs > 0) {
    // Convert milliseconds to days and hours
    const millisecondsInDay = 86400000; // 1000 ms * 60 s * 60 m * 24 h
    const millisecondsInHour = 3600000; // 1000 ms * 60 s * 60 m

    gapInDays = Math.floor(differenceInMs / millisecondsInDay);
    gapInHours = Math.floor(
      (differenceInMs % millisecondsInDay) / millisecondsInHour
    );
  }

  return {
    gapInDays,
    gapInHours,
  };
};

export const antdTimeFormat = (date, value, operation) => {
  return dayjs(
    dayJsTimeFormat(modifyDate(date, value, operation)),
    targetClosureDateFormat
  );
};

export const dayJsTimeFormat = (given_date) => {
  const date = given_date || new Date();
  const formattedDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    " " +
    ("0" + date.getHours()).slice(-2);
  return formattedDate;
};

export const modifyDate = (date, value, operation) => {
  const anyMinutes = date.getMinutes() !== 0;
  switch (operation) {
    case "addHours":
      const hoursToAdd = anyMinutes
        ? (value + 1) * 60 * 60 * 1000
        : value * 60 * 60 * 1000; // in miliseconds
      date.setTime(date.getTime() + hoursToAdd);
      return date;
    case "minusHours":
      const hoursToMinus = value * 60 * 60 * 1000; // in miliseconds
      date.setTime(date.getTime() - hoursToMinus);
      return date;
    case "addDays":
      const daysToAdd = value * 24 * 60 * 60 * 1000; // in miliseconds
      date.setTime(date.getTime() + daysToAdd);
      return date;
  }
};

// Generate Timestamp
export const getTimeStamp = (time) => {
  const expiryTime = moment(new Date(time)).unix();
  const hours = new Date(time).getHours();
  const seconds = new Date(time).getSeconds();
  const minutes = new Date(time).getMinutes() * 60;
  return expiryTime - (hours + seconds + minutes);
};

export const convertToDateTime = (date) => {
  let dateObj = new Date(date);
  let dates;
  if (isNaN(dateObj)) {
    dates = Number(date);
  } else {
    dates = dateObj.getTime();
  }
  let timeLeft = moment(dates).format(InTableDateFormat);
  return timeLeft;
};

export const defTargetDate = antdTimeFormat(new Date(), 24, "addHours");
export const defClosureDate = antdTimeFormat(
  new Date(defTargetDate),
  12,
  "minusHours"
);

// Date Picker's Disable Date & Time Methods
export const minDateTime = defTargetDate; //min date & time, 48 hours from today's date
export const maxDateTime = dayjs().add(365, "day"); //max date & time, 365 days from today's date

//Disable Date
export const disabledDate = (current) => {
  return (
    current &&
    (current < minDateTime.startOf("day") || current > maxDateTime.endOf("day"))
  );
};

// Disable Hours
export const disabledDateTime = (current) => {
  if (!current) {
    return {};
  }
  const isSameMinDay = current.isSame(minDateTime, "day");
  const isSameMaxDay = current.isSame(maxDateTime, "day");

  const disabledHours = () => {
    if (isSameMinDay) {
      return Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour < minDateTime.hour()
      );
    }
    if (isSameMaxDay) {
      return Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour > maxDateTime.hour()
      );
    }
    return [];
  };
  return {
    disabledHours,
  };
};

export const timeStampToDate = (date) => {
  if (!date) return;
  const reg = new RegExp(/^\d+$/);
  if (reg.test(date)) return new Date(date * 1000);
  return new Date(date);
};

export const convertTimeStampIntoHoursMinutes = (timesatmp) => {
  const duration = moment.duration(timesatmp, "seconds");

  // Calculate days and hours
  const days = Math.floor(duration.asDays());
  const hours = Math.floor(duration.asHours() % 24); // Hours remaining after removing full days

  return { hours, days };
};
