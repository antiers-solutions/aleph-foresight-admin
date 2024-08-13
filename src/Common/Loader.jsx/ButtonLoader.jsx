import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";

const ButtonLoader = () => {
  return (
    <Space>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Space>
  );
};

export default ButtonLoader;
