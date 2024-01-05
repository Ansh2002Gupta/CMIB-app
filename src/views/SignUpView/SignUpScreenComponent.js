import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import SignUpScreenUI from "./SignUpScreenUI";
import { navigations } from "../../constants/routeNames";
import { resetSignUpDetails } from "../../globalContext/signUp/signUpActions";
import { SignUpContext } from "../../globalContext/signUp/signUpProvider";

const SignUpScreenComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [, signUpDispatch] = useContext(SignUpContext);

  useEffect(() => {
    return () => {
      signUpDispatch(resetSignUpDetails());
    };
  }, [signUpDispatch]);

  const onHandleTab = (direction) => {
    setActiveTab((prevTab) => {
      if (direction === "next") {
        return prevTab + 1;
      } else if (direction === "prev" && prevTab > 0) {
        return prevTab - 1;
      }
      return prevTab;
    });
  };

  const onClickGoToLogin = () => {
    signUpDispatch(resetSignUpDetails());
    navigate(navigations.LOGIN);
  };

  return (
    <SignUpScreenUI
      intl={intl}
      onClickGoToLogin={onClickGoToLogin}
      onHandleTab={onHandleTab}
      activeTab={activeTab}
    />
  );
};

export default SignUpScreenComponent;
