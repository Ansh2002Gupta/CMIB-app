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

  const onClickGoToLogin = () => {
    navigate("/login");
  };

  const onChangePasswordInput = (val) => {
    setNewPassword(val);
  };

  const onChangeConfirmPasswordInput = (val) => {
    setConfirmNewPassword(val);
  };

  const handleSubmit = () => {
    // if (validatePassword()) {
    //   console.log("Password is valid and submitted!");
    // }
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
    />
  );
}

export default CreateNewPasswordComponent;
