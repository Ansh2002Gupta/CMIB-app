import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import useGetCompanyProfileAPI from "../../services/apiServices/hooks/CompanyProfile/useGetCompanyProfileAPI";
import { navigations } from "../../constants/routeNames";
import CompanyProfileUI from "./CompanyProfileUI";

const CompanyProfileComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { onGetProfile, profileResult, isLoading } = useGetCompanyProfileAPI();

  useEffect(() => {
    onGetProfile();
  }, []);

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  return (
    <CompanyProfileUI
      intl={intl}
      isLoading={isLoading}
      onGoBack={onGoBack}
      profileResult={profileResult}
    />
  );
};

export default CompanyProfileComponent;
