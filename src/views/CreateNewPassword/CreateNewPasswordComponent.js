import React, { useState } from "react";
import { useNavigate,useLocation } from "../../routes";
import { useIntl } from "react-intl";

import CreateNewPasswordUI from "./CreateNewPasswordUI";
import { navigations } from "../../constants/routeNames";
import useCreateNewPasswordAPI from "../../services/apiServices/hooks/useCreateNewPasswordAPI";

function CreateNewPasswordComponent(props) {

  const navigate = useNavigate();
  const location = useLocation();

  const { email ,otpCode} = location.state || {};

  const intl = useIntl();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const { handleCreateNewPasswordAPI,isLoading } = useCreateNewPasswordAPI();

  const onClickGoToLogin = () => {
    navigate(navigations.LOGIN);
  };

  const onChangePasswordInput = (val) => {
    setNewPassword(val);
  };

  const onChangeConfirmPasswordInput = (val) => {
    setConfirmNewPassword(val);
  };

  const handleSubmit = () => {

console.log("Calling API ........")
    handleCreateNewPasswordAPI({
      email: email,
      password: newPassword,
      password_confirmation: confirmNewPassword,
      otp: otpCode ,
    });

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
    />
  );
}

export default CreateNewPasswordComponent;
