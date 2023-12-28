import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import useGetCompanyProfileAPI from "../../services/apiServices/hooks/CompanyProfile/useGetCompanyProfileAPI";
import { navigations } from "../../constants/routeNames";
import CompanyProfileUI from "./CompanyProfileUI";
import { mapApiDataToUI } from "./mappedData";
import useIndustryTypes from "../../services/apiServices/hooks/useIndustryTypes";
import { INTEREST_OPTIONS } from "../../constants/constants";

const CompanyProfileComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { onGetProfile, profileResult, isLoading } = useGetCompanyProfileAPI();
  const [isEditProfile, showIsEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { getIndustryTypes, industryTypeResult } = useIndustryTypes();

  useEffect(() => {
    onGetProfile();
  }, []);

  useEffect(() => {
    if (profileResult) {
      setProfileData(mapApiDataToUI(profileResult, industryTypeResult));
    }
  }, [profileResult, industryTypeResult]);

  const [options, setOptions] = useState(
    INTEREST_OPTIONS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
      isSelected: false,
    }))
  );

  const onGoBack = () => {
    if (isEditProfile) {
      handleEdit(false);
    } else {
      navigate(navigations.PROFILE);
    }
  };

  const handleCompanyDetailChange = (fieldName, value) => {
    setProfileData({
      ...profileData,
      companyDetail: profileData.companyDetail.map((detail) =>
        detail.title === fieldName ? { ...detail, value: value } : detail
      ),
    });
  };

  const handleContactPersonInfo = (fieldName, value) => {
    setProfileData({
      ...profileData,
      contactPersonInfo: profileData.contactPersonInfo.map((detail) =>
        detail.title === fieldName ? { ...detail, value: value } : detail
      ),
    });
  };

  const handleCompanyProfile = (fieldName, value) => {
    setProfileData({
      ...profileData,
      companyProfile: profileData.companyProfile.map((detail) =>
        detail.title === fieldName ? { ...detail, value: value } : detail
      ),
    });
  };

  const handleEdit = (value) => {
    if (value) {
      getIndustryTypes();
    }
    showIsEditProfile(value);
  };

  return (
    <CompanyProfileUI
      handleCompanyDetailChange={handleCompanyDetailChange}
      handleContactPersonInfo={handleContactPersonInfo}
      handleCompanyProfile={handleCompanyProfile}
      handleEdit={handleEdit}
      options={options}
      intl={intl}
      isLoading={isLoading}
      isEditProfile={isEditProfile}
      onGoBack={onGoBack}
      profileResult={profileData}
    />
  );
};

export default CompanyProfileComponent;
