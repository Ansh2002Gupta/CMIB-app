import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";

import SignUpSecondScreenUI from "./SignUpSecondScreenUI";
import { navigations } from "../../../constants/routeNames";

const SignUpSecondScreenComponent = () => {
  const intl = useIntl();

  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate(navigations.Login);
  };

  const onGoBack = () => {
    navigate(navigations.Signup);
  };

  const onClickNext = () => {
    navigate(navigations.SignupThirdScreen);
  };

  return (
    <SignUpSecondScreenUI
      intl={intl}
      onClickGoToLogin={onClickGoToLogin}
      onGoBack={onGoBack}
      onClickNext={onClickNext}
    />
  );
};

export default SignUpSecondScreenComponent;
