import React, { useState, useEffect } from "react";
import { useNavigate } from "../../routes";
import { useIntl } from "react-intl";
import CreateNewPasswordUI from "./CreateNewPasswordUI";

function CreateNewPasswordComponent(props) {
  const navigate = useNavigate();
  const intl = useIntl();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    numeric: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    match: false,
  });

  const onClickGoToLogin = () => {
    navigate("/");
  };

  const onChangePasswordInput = (val) => {
    setNewPassword(val);
  };

  const onChangeConfirmPasswordInput = (val) => {
    setConfirmNewPassword(val);
  };

  const validatePassword = (newPassword, confirmNewPassword) => {
    setValidations({
      length: newPassword.length >= 6,
      numeric: /[0-9]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      specialChar: /[!?.@#$%^&+=]/.test(newPassword),
      match: newPassword === confirmNewPassword,
    });
  };

  useEffect(() => {
    validatePassword(newPassword, confirmNewPassword);
  }, [newPassword, confirmNewPassword]);

  const handleSubmit = () => {
    if (validatePassword()) {
      console.log("Password is valid and submitted!");
    }
  };
  return (
    <CreateNewPasswordUI
      handleSubmit={handleSubmit}
      onClickGoToLogin={onClickGoToLogin}
      validations={validations}
      onChangePasswordInput={onChangePasswordInput}
      newPassword={newPassword}
      confirmNewPassword={confirmNewPassword}
      onChangeConfirmPasswordInput={onChangeConfirmPasswordInput}
      error={error}
      intl={intl}
    />
  );
}

export default CreateNewPasswordComponent;
