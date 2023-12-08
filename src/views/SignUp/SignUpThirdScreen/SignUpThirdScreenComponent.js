import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";

import { navigations } from "../../../constants/routeNames";
import SignUpThirdScreenUI from "./SignUpThirdScreenUI";

const SignUpThirdScreenComponent = () => {
  const intl = useIntl();

  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate(navigations.Login);
  };

  const onGoBack = () => {
    navigate(navigations.SignupSecondScreen);
  };

  const onClickNext = () => {
    navigate(navigations.SignupLastScreen);
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
