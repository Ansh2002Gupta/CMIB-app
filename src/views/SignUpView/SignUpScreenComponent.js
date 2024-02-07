import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import { Platform } from "@unthinkable/react-core-components";

import SignUpScreenUI from "./SignUpScreenUI";
import { navigations } from "../../constants/routeNames";
import { resetSignUpDetails } from "../../globalContext/signUp/signUpActions";
import { SignUpContext } from "../../globalContext/signUp/signUpProvider";

const SignUpScreenComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const isWebPlatform = Platform.OS.toLowerCase() === "web";
  const [activeTab, setActiveTab] = useState(0);
  const [, signUpDispatch] = useContext(SignUpContext);

  useEffect(() => {
    return () => {
      signUpDispatch(resetSignUpDetails());
    };
  }, []);

  const onHandleTab = (direction) => {
    setActiveTab((prevTab) => {
      if (direction === "next") {
        return prevTab + 1;
      }
      if (direction === "prev" && prevTab > 0) {
        return prevTab - 1;
      }
      return prevTab;
    });
    if (isWebPlatform) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onClickGoToLogin = () => {
    signUpDispatch(resetSignUpDetails());
    navigate(navigations.LOGIN, { state: { activeTab: true } });
  };

  return (
    <SignUpScreenUI
      {...{
        activeTab,
        intl,
        onClickGoToLogin,
        onHandleTab,
      }}
    />
  );
};

export default SignUpScreenComponent;
