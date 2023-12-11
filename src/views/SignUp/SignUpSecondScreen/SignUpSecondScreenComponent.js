import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";

import SignUpSecondScreenUI from "./SignUpSecondScreenUI";
import { navigations } from "../../../constants/routeNames";

const SignUpSecondScreenComponent = () => {
  const intl = useIntl();

  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate(navigations.LOGIN);
  };

  const onGoBack = () => {
    navigate(navigations.SIGN_UP);
  };

  const onClickNext = () => {
    navigate(navigations.SIGNUP_THIRD_SCREEN);
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
