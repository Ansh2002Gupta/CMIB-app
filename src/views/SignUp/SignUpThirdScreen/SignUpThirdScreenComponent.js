import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";

import { navigations } from "../../../constants/routeNames";
import SignUpThirdScreenUI from "./SignUpThirdScreenUI";

const SignUpThirdScreenComponent = () => {
  const intl = useIntl();

  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate(navigations.LOGIN);
  };

  const onGoBack = () => {
    navigate(navigations.SIGNUP_SECOUND_SCREEN);
  };

  const onClickNext = () => {
    navigate(navigations.SIGNUP_LAST_SCREEN);
  };

  return (
    <SignUpThirdScreenUI
      intl={intl}
      onClickGoToLogin={onClickGoToLogin}
      onGoBack={onGoBack}
      onClickNext={onClickNext}
    />
  );
};

export default SignUpThirdScreenComponent;
