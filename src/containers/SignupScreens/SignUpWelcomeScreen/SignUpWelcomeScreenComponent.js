import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpWelcomeScreenUI from "./SignUpWelcomeScreenUI";
import useValidateSignUp from "../../../services/apiServices/hooks/useValidateSignUp";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { MODULE_OPTIONS } from "../../../constants/constants";

const SignUpScreenWelcomeComponent = ({ tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const { handleSignUpValidation } = useValidateSignUp();
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
  const [validationError, setValidationError] = useState("");

  const onClickNext = () => {
    const existingContactDetails =
      signUpState.signUpDetail.contact_details || [];
    const newContactDetails = contactDetails.filter(
      (detail) =>
        !existingContactDetails.some(
          (existingDetail) => existingDetail.module === detail.module
        )
    );

    const details = {
      contact_details: [...existingContactDetails, ...newContactDetails],
    };

    handleSignUpValidation(
      { details },
      () => {
        signUpDispatch(setSignUpDetails(details));
        tabHandler("next");
      },
      (error) => {
        setValidationError(error);
      }
    );
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
      handleDismissToast={handleDismissToast}
      validationError={validationError}
    />
  );
};

SignUpScreenWelcomeComponent.propTypes = {
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpScreenWelcomeComponent;
