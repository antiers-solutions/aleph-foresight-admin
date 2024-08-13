import React, { useState } from "react";
import "./Input.scss";
import VisibilityOff from "../../assets/images/VisibilityOff.svg";
import VisibilityOn from "../../assets/images/VisibilityOn.svg";

function InputCustom(props) {
  const {
    label,
    placeholder,
    type,
    error,
    regularInput,
    passwordInput,
    id,
    name,
    onChange,
    value,
    customClass,
    tabIndex,
    onBlur,
    disabled,
    required = false,
  } = props;
  const [typeOf, setTypeOf] = useState(false);

  return (
    <div
      className={`customInput ${
        passwordInput ? "customInput-password" : ""
      } ${customClass} ${error ? "customInput-inputError" : ""}`}
    >
      <label htmlFor={id}>
        {label}
        {required && <span> *</span>}
      </label>
      {regularInput && (
        <input
          placeholder={placeholder}
          type={type}
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          tabIndex={tabIndex}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete="off"
        />
      )}
      {passwordInput && (
        <div className="customInput-password_wrapper">
          <input
            placeholder={placeholder}
            type={typeOf ? "text" : "password"}
            id={id}
            name={name}
            onChange={onChange}
            value={value}
            tabIndex={tabIndex}
            onBlur={onBlur}
            autoComplete="off"
          />
          <button onClick={() => setTypeOf(!typeOf)} type="button">
            {typeOf ? (
              <img
                src={VisibilityOff}
                alt="VisibilityOff"
                width={20}
                height={20}
              />
            ) : (
              <img
                src={VisibilityOn}
                alt="VisibilityOn"
                width={20}
                height={20}
              />
            )}
          </button>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default InputCustom;
