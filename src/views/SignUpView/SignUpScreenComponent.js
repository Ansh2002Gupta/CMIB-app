import React, { useContext, useEffect, useState, useRef } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import SignUpScreenUI from "./SignUpScreenUI";
import useIsWebView from "../../hooks/useIsWebView";
import { navigations } from "../../constants/routeNames";
import { resetSignUpDetails } from "../../globalContext/signUp/signUpActions";
import { SignUpContext } from "../../globalContext/signUp/signUpProvider";

const SignUpScreenComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const { isWebView } = useIsWebView();
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
    if (isWebView) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };

  const onClickGoToLogin = () => {
    signUpDispatch(resetSignUpDetails());
    navigate(navigations.LOGIN, { state: { activeTab: true } });
  };

  return (
    <SignUpScreenUI
      intl={intl}
      onClickGoToLogin={onClickGoToLogin}
      onHandleTab={onHandleTab}
      activeTab={activeTab}
      scrollRef={scrollRef}
    />
  );
};

export default SignUpScreenComponent;
