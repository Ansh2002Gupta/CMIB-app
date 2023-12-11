import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";

import SignUpWelcomeScreenUI from "./SignUpWelcomeScreenUI";
import { navigations } from "../../../constants/routeNames";

const SignUpScreenWelcomeComponent = () => {
  const intl = useIntl();

  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate(navigations.LOGIN);
  };

  const onClickNext = () => {
    navigate(navigations.SIGNUP_SECOUND_SCREEN);
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
