import React from 'react'
import ButtonCustom from '../../ButtonCustom/ButtonCustom'
import { Form } from 'antd';
import { InputOTP } from 'antd-input-otp';
function SecurityQuestions({ onClick }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    // Your logic
  };
  return (
    <div className='plateformContent'>
      <p>Please Enter the 6 Digit Verification Code</p>
      <Form onFinish={handleFinish} form={form}>
        <Form.Item label="OTP" name="otp">
          <InputOTP autoSubmit={form} inputType="numeric" />
        </Form.Item>

        <div className='plateformContent__button'>
          <ButtonCustom label="Get OTP" onClick={onClick} />
        </div>
      </Form>

    </div>
  )
}

export default SecurityQuestions