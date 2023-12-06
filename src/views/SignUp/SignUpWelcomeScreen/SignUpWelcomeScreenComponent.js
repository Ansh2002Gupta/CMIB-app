import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";

import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";

import SignUpWelcomeScreenUI from "./SignUpWelcomeScreenUI";

const SignUpScreenWelcomeComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);

  const initialContactDetails = signUpState.signUpDetail.contact_details || [];

  const initialOptions = [
    { title: intl.formatMessage({ id: "label.ca_jobs" }), id: "ca-jobs" },
    {
      title: intl.formatMessage({ id: "label.newly_qualified_ca" }),
      id: "newly-qualified-ca-placememt",
    },
    {
      title: intl.formatMessage({ id: "label.overseas_placements" }),
      id: "overseas-placements",
    },
    {
      title: intl.formatMessage({ id: "label.career_ascents" }),
      id: "career-ascents",
    },
    {
      title: intl.formatMessage({ id: "label.women_placements" }),
      id: "women-placement",
    },
  ].map((option) => ({
    ...option,
    isSelected: initialContactDetails.some(
      (detail) => detail.module === option.id
    ),
  }));

  const [contactDetails, setContactDetails] = useState(initialContactDetails);
  const [options, setOptions] = useState(initialOptions);

  const onClickGoToLogin = () => {
    navigate("/");
  };

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

    signUpDispatch(setSignUpDetails(details));
    navigate("/signupSecondScreen");
  };

  return (
    <SignUpWelcomeScreenUI
      intl={intl}
      onClickGoToLogin={onClickGoToLogin}
      onClickNext={onClickNext}
      contactDetails={contactDetails}
      setContactDetails={setContactDetails}
      options={options}
      setOptions={setOptions}
    />
  );
};

export default SignUpScreenWelcomeComponent;
