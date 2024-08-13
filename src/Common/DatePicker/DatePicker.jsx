import React from "react";
import { DatePicker, Space } from "antd";
import "./DatePicker.scss";
import dayjs from "dayjs";
import {
  disabledDate,
  disabledDateTime,
  maxDateTime,
  minDateTime,
} from "../../helpers/commonTimeFunctions";
import { DatePickerFormat } from "../../constant/constants";

function CustomDatePicker({
  label,
  name,
  onChangeHandle,
  defaultValue,
  value,
  disable,
}) {
  const onChange = (dateString) => {
    onChangeHandle({ target: { name, value: dateString } });
  };

  return (
    <div className="datePicker">
      <label> {label}</label>
      <Space direction="vertical">
        <DatePicker
          onChange={onChange}
          placeholder="Select Date & Time"
          name={name}
          disabled={disable}
          disabledDate={disabledDate}
          minDate={minDateTime}
          maxDate={maxDateTime}
          disabledTime={disabledDateTime}
          onKeyUp={(e) => e.preventDefault()}
          onKeyDown={(e) => e.preventDefault()}
          defaultValue={
            defaultValue ? dayjs(defaultValue, DatePickerFormat) : null
          }
          value={value ? dayjs(value, DatePickerFormat) : null}
          showHour={true}
          showTime={true}
          showMinute={false}
          showSecond={false}
          format={DatePickerFormat}
        />
      </Space>
    </div>
  );
}

export default CustomDatePicker;
