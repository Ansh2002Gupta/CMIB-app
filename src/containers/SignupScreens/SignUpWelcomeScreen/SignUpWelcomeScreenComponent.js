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
  const { handleSignUpValidation, validationError, setValidationError } =
    useValidateSignUp();
  const initialContactDetails =
    signUpState?.signUpDetail?.contact_details || [];

  const initialOptions = MODULE_OPTIONS.map((option) => ({
    ...option,
    title: intl.formatMessage({ id: option.messageId }),
    isSelected: initialContactDetails.some(
      (detail) => detail.module === option.id
    ),
  }));

  const [contactDetails, setContactDetails] = useState(initialContactDetails);
  const [options, setOptions] = useState(initialOptions);

  const onClickNext = () => {
    const details = {
      contact_details: contactDetails,
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
      intl={intl}
      onClickNext={onClickNext}
      contactDetails={contactDetails}
      setContactDetails={setContactDetails}
      options={options}
      setOptions={setOptions}
      onClickGoToLogin={onClickGoToLogin}
      handleDismissToast={handleDismissToast}
      validationError={validationError}
    />
  );
};

SignUpScreenWelcomeComponent.propTypes = {
  onClickGoToLogin: PropTypes.func.isRequired,
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpScreenWelcomeComponent;
