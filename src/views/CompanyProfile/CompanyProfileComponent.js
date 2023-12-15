import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import { navigations } from "../../constants/routeNames";
import CompanyProfileUI from "./CompanyProfileUI";

const CompanyProfileComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate()

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  return <CompanyProfileUI intl={intl} onGoBack={onGoBack} />;
};

export default CompanyProfileComponent;
