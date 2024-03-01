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
  DEFAULT_INPUT_MAX_LENGTH,
  FIELD_MIN_LENGTH,
  FIRM_REGISTRATION_NO_LENGTH,
  INTEREST_OPTIONS,
  MODULE_OPTIONS,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  numRegex,
  PREVIOUS_SCREEN,
} from "../../constants/constants";
import { isValidUrl } from "../../utils/util";
import { mapApiDataToUI } from "./mappedData";
import { validateEmail } from "../../utils/validation";

const CompanyProfileComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { errorWhileGettingResult, onGetProfile, profileResult, isLoading } =
    useGetCompanyProfileAPI();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { getIndustryTypes, industryTypeResult } = useIndustryTypes();

  const [options, setOptions] = useState(
    INTEREST_OPTIONS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
      isSelected: false,
    }))
  );

  const [moduleOptions, setModuleOptions] = useState(
    MODULE_OPTIONS.map((option) => ({
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
        mapApiDataToUI(profileResult, industryTypeResult, isEditProfile)
      );
      const updatedModuleOptions = MODULE_OPTIONS.map((option) => ({
        ...option,
        title: intl.formatMessage({ id: option.messageId }),
        isSelected: profileResult?.company_module_access?.includes(option.id),
      }));
      const updatedInfoOptions = INTEREST_OPTIONS.map((option) => ({
        ...option,
        title: intl.formatMessage({ id: option.messageId }),
        isSelected: profileResult.source_of_information?.includes(
          intl.formatMessage({ id: option.messageId })
        ),
      }));
      setModuleOptions(updatedModuleOptions);
      setOptions(updatedInfoOptions);
    }
  }, [profileResult, industryTypeResult, isEditProfile]);

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

  const validateFields = () => {
    //TODO: Need to be optimize
    let isValid = true;
    let newErrors = {
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
    };
    const findValueByLabel = (label) => {
      const combinedDetails = [
        ...profileData.companyDetail,
        ...profileData.contactPersonInfo,
        ...profileData.companyProfile,
        ...profileData.otherDetails,
      ];
      const detail = combinedDetails.find((d) => d.label === label);
      return detail ? detail.value : "";
    };
    const companyName = findValueByLabel("label.company_name");
    const registrationNo = findValueByLabel("label.registration_no");
    const noOfPartners = findValueByLabel("label.no_of_partners");
    const address = findValueByLabel("label.address_for_correspondence");
    const emailId = findValueByLabel("label.email_id");
    const telephoneNo = findValueByLabel("label.telephone_no");
    const code = findValueByLabel("label.isd_std_code");
    const name = findValueByLabel("label.contact_person_name");
    const designation = findValueByLabel("label.contact_personal_designation");
    const contactEmailId = findValueByLabel(
      "label.enter_contact_person_email_id"
    );
    const mobileNo = findValueByLabel("label.mobile_number");
    const companyDetail = findValueByLabel(
      "label.short_profile_of_the_company"
    );
    const website = findValueByLabel("label.website");
    if (
      companyName.length < FIELD_MIN_LENGTH ||
      companyName.length > DEFAULT_INPUT_MAX_LENGTH
    ) {
      newErrors.companyName = intl.formatMessage({
        id: "label.company_name_validation",
      });
      isValid = false;
    }
    if (
      !numRegex.test(String(code)) ||
      code.length < CODE_MIN_LENGTH ||
      code.length > CODE_MAX_LENGTH
    ) {
      newErrors.code = intl.formatMessage({
        id: "label.country_code_validation",
      });
      isValid = false;
    }
    if (
      !numRegex.test(String(telephoneNo)) ||
      telephoneNo.length > NUMBER_MAX_LENGTH ||
      telephoneNo.length < NUMBER_MIN_LENGTH
    ) {
      newErrors.telephoneNo = intl.formatMessage({
        id: "label.telephone_no_validation",
      });
      isValid = false;
    }
    if (validateEmail(emailId)) {
      newErrors.emailId = intl.formatMessage({
        id: "label.email_id_validation",
      });
      isValid = false;
    }
    if (
      !numRegex.test(String(registrationNo)) ||
      registrationNo.length !== FIRM_REGISTRATION_NO_LENGTH
    ) {
      newErrors.registrationNo = intl.formatMessage({
        id: "label.registration_no_validation",
      });
      isValid = false;
    }
    if (
      address.length < FIELD_MIN_LENGTH ||
      address.length > ADDRESS_MAX_LENGTH
    ) {
      newErrors.address = intl.formatMessage({
        id: "label.address_validation",
      });
      isValid = false;
    }
    if (!numRegex.test(String(noOfPartners))) {
      newErrors.noOfPartners = intl.formatMessage({
        id: "label.no_of_partners_validation",
      });
      isValid = false;
    }
    if (
      name.length < FIELD_MIN_LENGTH ||
      name.length > DEFAULT_INPUT_MAX_LENGTH
    ) {
      newErrors.name = intl.formatMessage({
        id: "label.contact_person_validation",
      });
    }
    if (
      designation.length < FIELD_MIN_LENGTH ||
      designation.length > ADDRESS_MAX_LENGTH
    ) {
      newErrors.designation = intl.formatMessage({
        id: "label.designation_validation",
      });
    }
    if (
      !numRegex.test(String(mobileNo)) ||
      mobileNo.length !== FIRM_REGISTRATION_NO_LENGTH
    ) {
      newErrors.mobileNo = intl.formatMessage({
        id: "label.mobile_number_validation",
      });
    }
    if (validateEmail(contactEmailId)) {
      newErrors.contactEmailId = intl.formatMessage({
        id: "label.email_id_validation",
      });
    }
    if (
      companyDetail.length < FIELD_MIN_LENGTH ||
      companyDetail.length > COMPANY_DETAIL_MAX_LENGTH
    ) {
      newErrors.companyDetail = intl.formatMessage({
        id: "label.company_details_validation",
      });
      isValid = false;
    }
    if (!isValidUrl(String(website))) {
      newErrors.website = intl.formatMessage({
        id: "label.url_validation",
      });
      isValid = false;
    }
    const profileDataWithErrors = {
      ...profileData,
      companyDetail: profileData.companyDetail.map((detail) => ({
        ...detail,
        error: newErrors[detail?.key] || "",
      })),
      contactPersonInfo: profileData.contactPersonInfo.map((detail) => ({
        ...detail,
        error: newErrors[detail?.key] || "",
      })),
      companyProfile: profileData.companyProfile.map((detail) => ({
        ...detail,
        error: newErrors[detail?.key] || "",
      })),
      otherDetails: profileData.otherDetails.map((detail) => ({
        ...detail,
        error: newErrors[detail?.key] || "",
      })),
    };
    setProfileData(profileDataWithErrors);
    return isValid;
  };

  const onSaveClick = () => {
    if (validateFields()) {
      //TODO: CALL UPDATE API
      console.log("Form is valid. Proceed with the save operation.");
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

  const handleModuleToggle = (id) => {
    const updatedItems = moduleOptions.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setModuleOptions(updatedItems);
  };

  const onGoBack = () => {
    if (isEditProfile) {
      handleEdit(false);
    } else {
      navigate(PREVIOUS_SCREEN);
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

  const handleBalanceCreditChange = (value) => {
    setProfileData({
      ...profileData,
      balanceCredit: value,
    });
  };

  const handleContactPersonInfo = (index, fieldName, value) => {
    const updatedProfileData = { ...profileData };
    if (
      updatedProfileData.contactPersonInfo &&
      index >= 0 &&
      index < updatedProfileData.contactPersonInfo.length
    ) {
      const contactDetail = updatedProfileData.contactPersonInfo[index];
      const infoIndex = contactDetail.contactInfo.findIndex(
        (detail) => detail.label === fieldName
      );
      if (infoIndex !== -1) {
        contactDetail.contactInfo[infoIndex].value = value;
      }
      setProfileData(updatedProfileData);
    }
  };

  const handleSwitchChange = (index) => {
    const updatedContactPersonInfo = profileData.contactPersonInfo.map(
      (contact, idx) => {
        if (idx === index) {
          return { ...contact, isContactActive: !contact.isContactActive };
        }
        return contact;
      }
    );

    setProfileData({
      ...profileData,
      contactPersonInfo: updatedContactPersonInfo,
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
    setIsEditProfile(value);
  };

  return (
    <CompanyProfileUI
      handleBlur={handleBlur}
      allFieldsFilled={allFieldsFilled}
      error={errorWhileGettingResult}
      handleBalanceCreditChange={handleBalanceCreditChange}
      handleCompanyDetailChange={handleCompanyDetailChange}
      handleContactPersonInfo={handleContactPersonInfo}
      handleCompanyProfile={handleCompanyProfile}
      handleEdit={handleEdit}
      handleModuleToggle={handleModuleToggle}
      handleSwitchChange={handleSwitchChange}
      handleToggle={handleToggle}
      intl={intl}
      isLoading={isLoading}
      isEditProfile={isEditProfile}
      moduleOptions={moduleOptions}
      options={options}
      onGoBack={onGoBack}
      onSaveClick={onSaveClick}
      profileResult={profileData}
    />
  );
};

export default CompanyProfileComponent;
