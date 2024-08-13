import React, { useState } from "react";
import { Select, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./EventSelect.scss";
import { getCurrencyIconUrl } from "../../../../helpers/commonHelpers";

const EventSelect = ({
  onChangeHandle,
  name,
  value,
  cryptoList,
  isDisable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const elementClass = isDisable ? "todisabled" : "";

  const handleVisibleChange = (visible) => {
    setIsOpen(visible);
  };

  const handleChange = (selectedValue) => {
    const selectedCrypto = getCurrencyIconUrl(cryptoList, selectedValue);

    onChangeHandle({
      target: {
        name: "crypto",
        value: selectedValue,
        iconUrl: selectedCrypto.iconUrl,
      },
    });
  };

  return (
    <div className={`eventSelect  ${elementClass}`}>
      <Space wrap>
        <Select
          disabled={isDisable}
          onChange={handleChange}
          onDropdownVisibleChange={handleVisibleChange}
          name={name}
          placeholder="Select Crypto"
          value={value || "Select Crypto"}
          suffixIcon={
            <DownOutlined
              style={{
                transform: isOpen ? "rotate(180deg)" : "",
                transition: "0.3s all",
              }}
            />
          }
          dropdownClassName="selectBody"
        >
          {cryptoList?.length
            ? cryptoList.map((item) => (
                <Select.Option key={item?.id} value={item?.symbol}>
                  <span className="btcSelect">
                    <img
                      src={item?.iconUrl}
                      height={20}
                      width={20}
                      alt={item?.symbol}
                    />{" "}
                    {item?.symbol || ""}
                  </span>
                </Select.Option>
              ))
            : null}
        </Select>
      </Space>
    </div>
  );
};

export default EventSelect;
