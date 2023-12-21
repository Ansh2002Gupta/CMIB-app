import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useLocation } from "../../routes";

import CreateNewPasswordUI from "./CreateNewPasswordUI";
import useResetPasswordAPI from "../../services/apiServices/hooks/useResetPasswordAPI";
import { navigations } from "../../constants/routeNames";

function CreateNewPasswordComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();
  const { token } = location.state || {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    isLoading,
    errorWhileResetPassword,
    handleResetPasswordAPI,
    resetPasswordResult,
    setErrorWhileResetPassword,
    setResetPasswordResult,
  } = useResetPasswordAPI();

  const onClickGoToLogin = () => {
    setResetPasswordResult({});
    navigate(navigations.LOGIN);
  };

  const onChangePasswordInput = (val) => {
    setNewPassword(val);
  };

  const onChangeConfirmPasswordInput = (val) => {
    setConfirmNewPassword(val);
  };

  const doPasswordsMatch = () =>
    newPassword.trim().toLowerCase() ===
    confirmNewPassword.trim().toLowerCase();

  const handleConfirmPasswordBlur = () => {
    if (confirmNewPassword && newPassword && !doPasswordsMatch()) {
      setErrorMessage(intl.formatMessage({ id: "label.error_password" }));
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = () => {
    if (
      !newPassword.trim().toLowerCase() &&
      !confirmNewPassword.trim().toLowerCase()
    ) {
      return;
    }
    if (doPasswordsMatch()) {
      setErrorMessage("");
      handleResetPasswordAPI({
        token,
        password: newPassword,
      });
    } else {
      setErrorMessage(intl.formatMessage({ id: "label.error_password" }));
    }
  };

  return (
    <CreateNewPasswordUI
      errorMessage={errorMessage}
      handleSubmit={handleSubmit}
      onClickGoToLogin={onClickGoToLogin}
      onChangePasswordInput={onChangePasswordInput}
      newPassword={newPassword}
      confirmNewPassword={confirmNewPassword}
      onChangeConfirmPasswordInput={onChangeConfirmPasswordInput}
      intl={intl}
      isLoading={isLoading}
      handleConfirmPasswordBlur={handleConfirmPasswordBlur}
      successLogin={!!resetPasswordResult?.message}
      successMsg={resetPasswordResult?.message}
      validationError={errorWhileResetPassword}
      setErrorWhileResetPassword={setErrorWhileResetPassword}
    />
  );
}
export default CreateNewPasswordComponent;
