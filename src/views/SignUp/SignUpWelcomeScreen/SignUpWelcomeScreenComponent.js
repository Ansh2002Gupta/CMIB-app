import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";

import SignUpWelcomeScreenUI from "./SignUpWelcomeScreenUI";

const SignUpScreenWelcomeComponent = () => {
  const intl = useIntl();

  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate("/login");
  };

  const onClickNext = () => {
    navigate("/signupSecondScreen");
  };

  return (
    <SignUpWelcomeScreenUI
      intl={intl}
      onClickGoToLogin={onClickGoToLogin}
      onClickNext={onClickNext}
    />
  );
};

export default SignUpScreenWelcomeComponent;
