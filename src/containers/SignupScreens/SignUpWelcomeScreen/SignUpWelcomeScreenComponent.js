import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpWelcomeScreenUI from "./SignUpWelcomeScreenUI";
import useValidateSignUp from "../../../services/apiServices/hooks/SignUp/useValidateSignUp";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { MODULE_OPTIONS } from "../../../constants/constants";

const SignUpScreenWelcomeComponent = ({ onClickGoToLogin, tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const {
    handleSignUpValidation,
    isLoading,
    validationError,
    setValidationError,
  } = useValidateSignUp();
  const initialModuleList = signUpState?.signUpDetail?.module_list || [];

  const initialOptions = MODULE_OPTIONS.map((option) => ({
    ...option,
    title: intl.formatMessage({ id: option.messageId }),
    isSelected: initialModuleList.some((detail) => detail === option.id),
  }));

  const [moduleList, setModuleList] = useState(initialModuleList);
  const [options, setOptions] = useState(initialOptions);

  const onClickNext = () => {
    const details = {
      module_list: moduleList,
    };

    handleSignUpValidation({ details }, () => {
      signUpDispatch(setSignUpDetails(details));
      tabHandler("next");
    });
  };

  const handleDismissToast = () => {
    setValidationError("");
  };

  return (
    <SignUpWelcomeScreenUI
      moduleList={moduleList}
      handleDismissToast={handleDismissToast}
      intl={intl}
      isLoading={isLoading}
      onClickGoToLogin={onClickGoToLogin}
      onClickNext={onClickNext}
      options={options}
      setModuleList={setModuleList}
      setOptions={setOptions}
      validationError={validationError}
    />
  );
};

SignUpScreenWelcomeComponent.propTypes = {
  onClickGoToLogin: PropTypes.func.isRequired,
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpScreenWelcomeComponent;
