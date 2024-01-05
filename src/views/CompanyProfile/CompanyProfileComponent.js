import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import CompanyProfileUI from "./CompanyProfileUI";
import useGetCompanyProfileAPI from "../../services/apiServices/hooks/CompanyProfile/useGetCompanyProfileAPI";
import useIndustryTypes from "../../services/apiServices/hooks/useIndustryTypes";
import {
  ADDRESS_MAX_LENGTH,
  CODE_MAX_LENGTH,
  CODE_MIN_LENGTH,
  COMPANY_DETAIL_MAX_LENGTH,
  FIELD_MAX_LENGTH,
  FIELD_MIN_LENGTH,
  INTEREST_OPTIONS,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  numRegex,
  REGISTRATION_NO_LENGTH,
  urlRegex,
} from "../../constants/constants";
import { mapApiDataToUI } from "./mappedData";
import { navigations } from "../../constants/routeNames";
import { validateEmail } from "../../constants/commonFunctions";

const CompanyProfileComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { errorWhileGettingResult, onGetProfile, profileResult, isLoading } =
    useGetCompanyProfileAPI();
  const [isEditProfile, showIsEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { getIndustryTypes, industryTypeResult } = useIndustryTypes();

  const [inputErrors, setInputErrors] = useState({
    companyName: "",
    registrationNo: "",
    noOfPartners: "",
    address: "",
    emailId: "",
    telephoneNo: "",
    code: "",
    designation: "",
    contactEmailId: "",
    mobileNo: "",
    name: "",
    companyDetail: "",
    website: "",
  });

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
      setProfileData(
        mapApiDataToUI(
          profileResult,
          industryTypeResult,
          isEditProfile,
          inputErrors
        )
      );
    }
  }, [profileResult, industryTypeResult, isEditProfile, inputErrors]);

  const allFieldsFilled = () => {
    const companyDetailsFilled = profileData.companyDetail.every(
      (detail) => String(detail.value).trim() !== ""
    );

    const contactPersonInfoFilled = profileData.contactPersonInfo.every(
      (detail) => String(detail.value).trim() !== ""
    );

    const companyProfileFilled = profileData.companyProfile.every(
      (detail) => String(detail.value).trim() !== ""
    );

    return (
      companyDetailsFilled && contactPersonInfoFilled && companyProfileFilled
    );
  };

  function isLengthValid(value, min, max) {
    return value.length >= min && value.length <= max;
  }

  const validateFields = () => {
    let isValid = true;
    const newErrors = {}; 
    const combinedDetails = [
      ...profileData.companyDetail,
      ...profileData.contactPersonInfo,
      ...profileData.companyProfile,
      ...profileData.otherDetails,
    ];
    const findValueByLabel = (label) => combinedDetails.find((d) => d.label === `label.${label}`)?.value || "";
    const fields = [
      { key: 'companyName', label: 'company_name', min: FIELD_MIN_LENGTH, max: FIELD_MAX_LENGTH },
      { key: 'registrationNo', label: 'registration_no', exact: REGISTRATION_NO_LENGTH },
      { key: 'noOfPartners', label: 'no_of_partners' },
      { key: 'address', label: 'address', min: FIELD_MIN_LENGTH, max: ADDRESS_MAX_LENGTH },
      { key: 'emailId', label: 'email_id' },
      { key: 'telephoneNo', label: 'telephone_no', min: NUMBER_MIN_LENGTH, max: NUMBER_MAX_LENGTH },
      { key: 'code', label: 'country_code', min: CODE_MIN_LENGTH, max: CODE_MAX_LENGTH },
      { key: 'name', label: 'contact_person', min: FIELD_MIN_LENGTH, max: FIELD_MAX_LENGTH },
      { key: 'designation', label: 'designation', min: FIELD_MIN_LENGTH, max: FIELD_MAX_LENGTH },
      { key: 'mobileNo', label: 'mobile_number', exact: REGISTRATION_NO_LENGTH },
      { key: 'companyDetail', label: 'company_details', min: FIELD_MIN_LENGTH, max: COMPANY_DETAIL_MAX_LENGTH },
      { key: 'website', label: 'url' },
    ];
    fields.forEach(({ key, label, min, max, exact }) => {
      const value = findValueByLabel(label);
      const lengthCheck = exact ? value.length === exact : isLengthValid(value, min, max);
      if (key === 'emailId' || key === 'contactEmailId') {
        if (!validateEmail(value)) {
          newErrors[key] = intl.formatMessage({ id: `label.${label}_validation` });
          isValid = false;
        }
      } else if (key === 'website') {
        if (!urlRegex.test(value)) {
          newErrors[key] = intl.formatMessage({ id: `label.${label}_validation` });
          isValid = false;
        }
      } else if (!lengthCheck || (['code', 'telephoneNo', 'registrationNo', 'mobileNo', 'noOfPartners'].includes(key) && !numRegex.test(value))) {
        newErrors[key] = intl.formatMessage({ id: `label.${label}_validation` });
        isValid = false;
      }
    });
    setInputErrors(newErrors);
    return isValid;
  };
  

  const onSaveClick = () => {
    if (validateFields()) {
    }
  };

  const handleBlur = (fieldName) => {
    validateFields(fieldName);
  };

  const handleToggle = (id) => {
    const updatedItems = options.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setOptions(updatedItems);
  };

  const onGoBack = () => {
    if (isEditProfile) {
      setInputErrors({
        companyName: "",
        registrationNo: "",
        noOfPartners: "",
        address: "",
        emailId: "",
        telephoneNo: "",
        code: "",
        designation: "",
        contactEmailId: "",
        mobileNo: "",
        name: "",
        companyDetail: "",
        website: "",
      });
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
    const updatedCompanyProfile = profileData.companyProfile.map((detail) =>
      detail.label === fieldName ? { ...detail, value: value } : detail
    );

    const updatedOtherDetails = profileData.otherDetails.map((detail) =>
      detail.label === fieldName ? { ...detail, value: value } : detail
    );

    setProfileData({
      ...profileData,
      companyProfile: updatedCompanyProfile,
      otherDetails: updatedOtherDetails,
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
      handleBlur={handleBlur}
      allFieldsFilled={allFieldsFilled}
      error={errorWhileGettingResult}
      handleCompanyDetailChange={handleCompanyDetailChange}
      handleContactPersonInfo={handleContactPersonInfo}
      handleCompanyProfile={handleCompanyProfile}
      handleEdit={handleEdit}
      handleToggle={handleToggle}
      intl={intl}
      isLoading={isLoading}
      isEditProfile={isEditProfile}
      options={options}
      onGoBack={onGoBack}
      onSaveClick={onSaveClick}
      profileResult={profileData}
    />
  );
};

export default CompanyProfileComponent;
