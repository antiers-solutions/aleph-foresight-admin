import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="no-events-found">
      <Spin size="large" />
    </div>
  );
};

export default Loader;
