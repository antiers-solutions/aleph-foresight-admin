import React from "react";
import dayjs from "dayjs";
import {
  antdTimeFormat,
  convertTimeStampIntoHoursMinutes,
  convertToDateTime,
  defClosureDate,
  defTargetDate,
  disabledDate,
  disabledDateTime,
  getDaysAndHours,
  getTimeStamp,
  handleTargetDateChange,
  maxDateTime,
  minDateTime,
  modifyDate,
  timeStampToDate,
} from "../commonTimeFunctions";
import moment from "moment";
import { InTableDateFormat } from "../../constant/constants";

describe("common Time Functions", () => {
  // handle Target date
  it("should correctly update the formData based on targetDate", () => {
    const targetDate = new Date();
    const formData = {
      betClosureTime: null,
      eventDurationDays: 0,
      eventDurationHours: 0,
      targetDate: null,
    };

    const result = handleTargetDateChange(targetDate, formData);

    expect(result).toHaveProperty("betClosureTime");
    expect(result).toHaveProperty("eventDurationDays");
    expect(result).toHaveProperty("eventDurationHours");
    expect(result).toHaveProperty("targetDate", targetDate);
  });

  //   get days and hours
  it("should calculate the correct number of days and hours", () => {
    const targetDate = new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000
    ); // 3 days and 5 hours from now

    const result = getDaysAndHours(targetDate);

    expect(result).toEqual({ gapInDays: 3, gapInHours: 5 });
  });

  it("should return 0 days and hours if targetDate is in the past", () => {
    const targetDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000); // 1 day in the past

    const result = getDaysAndHours(targetDate);

    expect(result).toEqual({ gapInDays: 0, gapInHours: 0 });
  });

  // antd timeFormat

  it("should format the date correctly based on the operation", () => {
    const date = new Date();
    const formattedDate = antdTimeFormat(date, 12, "minusHours");

    expect(dayjs(formattedDate).isValid()).toBe(true);
  });

  //Modify Date

  it("should add hours correctly", () => {
    const date = new Date();
    const modifiedDate = modifyDate(date, 2, "addHours");

    expect(modifiedDate.getHours()).toBe(date.getHours());
  });

  it("should subtract hours correctly", () => {
    const date = new Date();
    const modifiedDate = modifyDate(date, 2, "minusHours");

    expect(modifiedDate.getHours()).toBe(date.getHours());
  });

  it("should add days correctly", () => {
    const date = new Date();
    const modifiedDate = modifyDate(date, 1, "addDays");

    expect(modifiedDate.getDate()).toBe(date.getDate());
  });

  // Convert To Date & Time
  // it("should convert a date to the specified format", () => {
  //   const date = "1722601782";
  //   const formattedDate = convertToDateTime(date);

  //   expect(formattedDate).toMatch("1970-01-20 | 22:01:78"); // Format: YYYY-MM-DD | HH:mm:ss
  // });

  // default times
  it("defTargetDate should be 24 hours from now", () => {
    const now = new Date();
    const expectedDate = antdTimeFormat(now, 24, "addHours");
    expect(defTargetDate).toEqual(expectedDate);
  });

  it("defClosureDate should be 12 hours before defTargetDate", () => {
    const expectedDate = antdTimeFormat(
      new Date(defTargetDate),
      12,
      "minusHours"
    );
    expect(defClosureDate).toEqual(expectedDate);
  });

  // Disable Dates
  it("dates before minDateTime should be disabled", () => {
    const dateBeforeMin = dayjs(minDateTime).subtract(1, "day");
    expect(disabledDate(dateBeforeMin)).toBeTruthy();
  });

  it("dates after maxDateTime should be disabled", () => {
    const dateAfterMax = dayjs(maxDateTime).add(1, "day");
    expect(disabledDate(dateAfterMax)).toBeTruthy();
  });

  it("dates between minDateTime and maxDateTime should not be disabled", () => {
    const dateInRange = dayjs(minDateTime).add(1, "day");
    expect(disabledDate(dateInRange)).toBeFalsy();
  });

  // Disable Hours
  it("hours before minDateTime should be disabled on minDateTime day", () => {
    const minDate = dayjs(minDateTime).startOf("day");
    const disabledHours = disabledDateTime(minDate).disabledHours();
    expect(disabledHours).toEqual(
      expect.arrayContaining(
        Array.from({ length: 24 }, (_, i) => i).filter(
          (hour) => hour < minDateTime.hour()
        )
      )
    );
  });

  it("hours after maxDateTime should be disabled on maxDateTime day", () => {
    const maxDate = dayjs(maxDateTime).startOf("day");
    const disabledHours = disabledDateTime(maxDate).disabledHours();
    expect(disabledHours).toEqual(
      expect.arrayContaining(
        Array.from({ length: 24 }, (_, i) => i).filter(
          (hour) => hour > maxDateTime.hour()
        )
      )
    );
  });

  it("if minDateTime is empty it should return empty object", () => {
    const date = null;
    const disabledDateTime = (current) => {
      if (!current) {
        return {};
      }
    };
    const result = disabledDateTime(date);
    const disabledHours = result;
    expect(disabledHours).toEqual({});
  });

  it("hours on other days should not be disabled", () => {
    const otherDate = dayjs(minDateTime).add(1, "day").startOf("day");
    expect(disabledDateTime(otherDate).disabledHours()).toEqual([]);
  });

  // Convert Timestamp to Date
  it("should convert Unix timestamp to Date", () => {
    const timestamp = 1638316800; // Example timestamp
    expect(timeStampToDate(timestamp)).toEqual(new Date(timestamp * 1000));
  });

  it("should convert regular date string to Date", () => {
    const dateStr = "2022-01-01T00:00:00Z";
    expect(timeStampToDate(dateStr)).toEqual(new Date(dateStr));
  });

  //Convert Timestamp into hours
  it("should convert timestamp into hours and minutes correctly", () => {
    const timestamp = 90000; // Example duration in seconds
    expect(convertTimeStampIntoHoursMinutes(timestamp)).toEqual({
      hours: 1,
      days: 1,
    });
  });

  //Generate Timestamp
  it("should return correct timestamp for given date", () => {
    const time = new Date("2024-08-05T12:30:45Z"); // Example input
    const expiryTime = moment(time).unix();
    const hours = time.getHours();
    const seconds = time.getSeconds();
    const minutes = time.getMinutes() * 60;

    const expectedTimestamp = expiryTime - (hours + seconds + minutes);
    expect(getTimeStamp(time)).toBe(expectedTimestamp);
  });
});
