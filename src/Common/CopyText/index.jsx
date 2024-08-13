import React from "react";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";

export default function CopyText({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      <Tooltip
        title={copied ? " Copied" : "Copy Address"}
        onClick={handleCopyClick}
        className="copyIcon"
      >
        {copied ? <CheckOutlined /> : <CopyOutlined />}
      </Tooltip>
    </>
  );
}
