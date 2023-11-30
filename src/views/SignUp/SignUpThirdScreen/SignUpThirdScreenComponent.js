import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";
import SignUpThirdScreenUI from "./SignUpThirdScreenUI";

const SignUpThirdScreenComponent = () => {
  const intl = useIntl();

  const navigate = useNavigate();

  const onClickGoToLogin = () => {
    navigate("/");
  };

  const onGoBack = () => {
    navigate("/signupSecondScreen");
  };

  const onClickNext = () => {
    navigate("/signupLastScreen");
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
