import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";

import CompanyProfileUI from "./CompanyProfileUI";

const CompanyProfileComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate("/account");
  };

  return <CompanyProfileUI intl={intl} onGoBack={onGoBack} />;
};

export default CompanyProfileComponent;
