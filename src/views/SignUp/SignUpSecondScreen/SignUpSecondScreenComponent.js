import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";

import SignUpSecondScreenUI from "./SignUpSecondScreenUI";

const SignUpSecondScreenComponent = () => {
  const intl = useIntl();

  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate("/");
  };

  const onGoBack = () => {
    navigate("/signup");
  };

  const onClickNext = () => {
    navigate("/signupThirdScreen");
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
