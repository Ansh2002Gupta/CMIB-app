import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import CreateNewPasswordUI from "./CreateNewPasswordUI";
import useResetPasswordAPI from "../../services/apiServices/hooks/useResetPasswordAPI";
import { navigations } from "../../constants/routeNames";
import {
  handleNewPasswordChange,
  handleConfirmPasswordChange,
} from "../../utils/validation";

function CreateNewPasswordComponent({ resetToken }) {
  const navigate = useNavigate();
  const intl = useIntl();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setError] = useState("");

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
    navigate(navigations.LOGIN, { state: { activeTab: true } });
  };

  const onChangePasswordInput = (val) => {
    handleNewPasswordChange({
      confirmNewPassword,
      setNewPassword,
      setError,
      val,
    });
  };

  const onChangeConfirmPasswordInput = (val) => {
    handleConfirmPasswordChange({
      newPassword,
      setConfirmNewPassword,
      setError,
      val,
    });
  };

  const doPasswordsMatch = () =>
    newPassword.trim().toLowerCase() ===
    confirmNewPassword.trim().toLowerCase();

  const handleSubmit = () => {
    if (
      !newPassword.trim().toLowerCase() &&
      !confirmNewPassword.trim().toLowerCase()
    ) {
      return;
    }
    if (doPasswordsMatch()) {
      setError("");
      handleResetPasswordAPI({
        token: resetToken,
        password: newPassword,
      });
    } else {
      setError(intl.formatMessage({ id: "label.password-not-match" }));
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
      successLogin={!!resetPasswordResult?.message}
      setError={setError}
      validationError={errorWhileResetPassword}
      setErrorWhileResetPassword={setErrorWhileResetPassword}
    />
  );
}
export default CreateNewPasswordComponent;
