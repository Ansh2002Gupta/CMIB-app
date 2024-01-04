import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import CompanyProfileUI from "./CompanyProfileUI";
import useGetCompanyProfileAPI from "../../services/apiServices/hooks/CompanyProfile/useGetCompanyProfileAPI";
import useIndustryTypes from "../../services/apiServices/hooks/useIndustryTypes";
import { navigations } from "../../constants/routeNames";
import { mapApiDataToUI } from "./mappedData";
import { INTEREST_OPTIONS } from "../../constants/constants";

const CompanyProfileComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { errorWhileGettingResult, onGetProfile, profileResult, isLoading } =
    useGetCompanyProfileAPI();
  const [isEditProfile, showIsEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { getIndustryTypes, industryTypeResult } = useIndustryTypes();

  const [options, setOptions] = useState(
    INTEREST_OPTIONS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
      isSelected: false,
    }))
  );

  useEffect(() => {
    onGetProfile();
  }, []);

  useEffect(() => {
    if (profileResult) {
      setProfileData(mapApiDataToUI(profileResult, industryTypeResult));
    }
  }, [profileResult, industryTypeResult]);

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
        detail.label === fieldName ? { ...detail, value: value } : detail
      ),
    });
  };

  const handleContactPersonInfo = (fieldName, value) => {
    setProfileData({
      ...profileData,
      contactPersonInfo: profileData.contactPersonInfo.map((detail) =>
        detail.label === fieldName ? { ...detail, value: value } : detail
      ),
    });
  };

  const handleCompanyProfile = (fieldName, value) => {
    setProfileData({
      ...profileData,
      companyProfile: profileData.companyProfile.map((detail) =>
        detail.label === fieldName ? { ...detail, value: value } : detail
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
      error={errorWhileGettingResult}
      handleCompanyDetailChange={handleCompanyDetailChange}
      handleContactPersonInfo={handleContactPersonInfo}
      handleCompanyProfile={handleCompanyProfile}
      handleEdit={handleEdit}
      intl={intl}
      isLoading={isLoading}
      isEditProfile={isEditProfile}
      options={options}
      onGoBack={onGoBack}
      profileResult={profileData}
    />
  );
};

export default CompanyProfileComponent;
