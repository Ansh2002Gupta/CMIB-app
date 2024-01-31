import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import CreateNewPasswordUI from "./CreateNewPasswordUI";
import useResetPasswordAPI from "../../services/apiServices/hooks/useResetPasswordAPI";
import { navigations } from "../../constants/routeNames";

function CreateNewPasswordComponent({ resetToken }) {
  const navigate = useNavigate();
  const intl = useIntl();

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
    navigate(navigations.LOGIN, { state: { activeTab: true } });
  };

  const onChangePasswordInput = (val) => {
    const trimmedPassword = val.trim();
    setNewPassword(trimmedPassword);
    if (!!confirmNewPassword && !!val && confirmNewPassword === val) {
      setErrorMessage("");
    }
  };

  const onChangeConfirmPasswordInput = (val) => {
    const trimmedPassword = val.trim();
    setConfirmNewPassword(trimmedPassword);
    if (!!newPassword && !!val && newPassword === val) {
      setErrorMessage("");
    }
  };

  const doPasswordsMatch = () =>
    newPassword.trim().toLowerCase() ===
    confirmNewPassword.trim().toLowerCase();

  const handleConfirmPasswordBlur = () => {
    if (!!confirmNewPassword && !!newPassword && !doPasswordsMatch()) {
      setErrorMessage(intl.formatMessage({ id: "label.password-not-match" }));
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
        token: resetToken,
        password: newPassword,
      });
    } else {
      setErrorMessage(intl.formatMessage({ id: "label.password-not-match" }));
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
      validationError={errorWhileResetPassword}
      setErrorWhileResetPassword={setErrorWhileResetPassword}
    />
  );
}
export default CreateNewPasswordComponent;
