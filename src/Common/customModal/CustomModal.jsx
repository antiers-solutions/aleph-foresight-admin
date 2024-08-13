import React from "react";
import "./CustomModal.scss";
import { Modal } from "antd";

const CustomModal = ({
  visible,
  onClose,
  title,
  content,
  width,
  borderRadius,
  className,
}) => {
  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onClose}
      width={width}
      borderRadius={borderRadius}
      className={`customModal ${className}`}
      centered
      footer={false}
      maskClosable={false}
    >
      {content}
    </Modal>
  );
};

export default CustomModal;
