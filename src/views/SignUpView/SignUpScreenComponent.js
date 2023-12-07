import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import SignUpScreenUI from "./SignUpScreenUI";

const SignUpScreenComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

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
    navigate("/");
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
