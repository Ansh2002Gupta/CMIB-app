import React, { useState } from "react";
import { useNavigate,useLocation } from "../../routes";
import { useIntl } from "react-intl";

import CreateNewPasswordUI from "./CreateNewPasswordUI";
import useResetPasswordAPI from "../../services/apiServices/hooks/useRestPasswordAPI";
import { navigations } from "../../constants/routeNames";

function CreateNewPasswordComponent(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();
  const {token} = location.state || {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [successLogin, setSuccessLogin] = useState(false); 
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  
  const { handleResetPasswordAPI,isLoading } = useResetPasswordAPI();

  const onClickGoToLogin = () => {
    setSuccessLogin(false);
    navigate(navigations.LOGIN);
  };

  const onChangePasswordInput = (val) => {
    setNewPassword(val);
  };

  const onChangeConfirmPasswordInput = (val) => {
    setConfirmNewPassword(val);
  };

  const handleSubmit = () => {
    handleResetPasswordAPI({
      token: token,
      password: newPassword,
    }, 
    (msg) => {
      setSuccessMsg(msg);
      setSuccessLogin(true);
    },
      (error) => {
      setValidationError(error);
    });
  };

  const handleDismissToast = () => {
    setValidationError("");
  };
  
  return (
    <CreateNewPasswordUI
      handleSubmit={handleSubmit}
      onClickGoToLogin={onClickGoToLogin}
      onChangePasswordInput={onChangePasswordInput}
      newPassword={newPassword}
      confirmNewPassword={confirmNewPassword}
      onChangeConfirmPasswordInput={onChangeConfirmPasswordInput}
      error={error}
      intl={intl}
      isLoading={isLoading}
      handleDismissToast={handleDismissToast}
      successLogin={successLogin}
      successMsg={successMsg}
      validationError={validationError}
    />
  );
}
export default CreateNewPasswordComponent;
