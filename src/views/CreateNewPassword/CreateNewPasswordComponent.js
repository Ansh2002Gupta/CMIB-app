import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Storage from "../../services/storage-service";
import { useNavigate, useLocation } from "../../routes";

import CreateNewPasswordUI from "./CreateNewPasswordUI";
import useResetPasswordAPI from "../../services/apiServices/hooks/useResetPasswordAPI";
import { navigations } from "../../constants/routeNames";

function CreateNewPasswordComponent() {
  const navigate = useNavigate();
  const intl = useIntl();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(null); // State to hold the token

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await Storage.get("token");
        setToken(storedToken?.data?.reset_token);
      } catch (error) {
        console.error("Error retrieving token from storage:", error);
      }
    };

    fetchToken();
  }, []);

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
        reset_token: token,
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
