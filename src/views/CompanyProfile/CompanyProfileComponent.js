import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import CompanyProfileUI from "./CompanyProfileUI";
import useGetCompanyProfileAPI from "../../services/apiServices/hooks/CompanyProfile/useGetCompanyProfileAPI";
import useFetch from "../../hooks/useFetch";
import useIndustryTypes from "../../services/apiServices/hooks/useIndustryTypes";
import useUpdateCompanyProfile from "../../services/apiServices/hooks/CompanyProfile/useUpdateCompanyProfileAPI";
import {
  ADDRESS_MAX_LENGTH,
  CODE_MAX_LENGTH,
  CODE_MIN_LENGTH,
  COMPANY_DETAIL_MAX_LENGTH,
  DEFAULT_INPUT_MAX_LENGTH,
  FIELD_MIN_LENGTH,
  FIRM_OF_CHARTERED_ACCOUNTANTS,
  FIRM_REGISTRATION_NO_LENGTH,
  INTEREST_OPTIONS,
  MODULE_OPTIONS,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  numRegex,
  PREVIOUS_SCREEN,
} from "../../constants/constants";
import { COUNTRY_CODE } from "../../services/apiServices/apiEndPoint";
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
  const {
    handleUpdateProfile,
    isLoading: isUpdatingCompanyProfile,
    isSuccess: isUpdatedCompanyProfile,
    updationError,
  } = useUpdateCompanyProfile();
  const { data: countryCodes } = useFetch({ url: COUNTRY_CODE });

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
        mapApiDataToUI({
          apiData: profileResult,
          industryOptions: industryTypeResult,
          countryCodes,
          isEditMode: isEditProfile,
        })
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
      (contact) =>
        contact.contactInfo.every((info) => String(info.value).trim() !== "")
    );
    const companyProfileFilled = profileData.companyProfile.every(
      (detail) => String(detail.value).trim() !== ""
    );
    const otherDetailsFilled = profileData.otherDetails.every(
      (detail) => String(detail.value).trim() !== ""
    );

    return (
      companyDetailsFilled &&
      contactPersonInfoFilled &&
      companyProfileFilled &&
      otherDetailsFilled
    );
  };

  const validateContactPersonDetails = (newErrors) => {
    let isValid = true;
    profileData.contactPersonInfo.forEach((contact, index) => {
      let contactErrors = {};
      const contactName = contact.contactInfo.find(
        (info) => info.label === "label.contact_person_name"
      )?.value;
      if (
        contactName.length < FIELD_MIN_LENGTH ||
        contactName.length > DEFAULT_INPUT_MAX_LENGTH
      ) {
        contactErrors.name = intl.formatMessage({
          id: "label.contact_person_validation",
        });
        isValid = false;
      }

      const contactDesignation = contact.contactInfo.find(
        (info) => info.label === "label.contact_personal_designation"
      )?.value;
      if (
        contactDesignation.length < FIELD_MIN_LENGTH ||
        contactDesignation.length > ADDRESS_MAX_LENGTH
      ) {
        contactErrors.designation = intl.formatMessage({
          id: "label.designation_validation",
        });
        isValid = false;
      }

      const contactMobileNo = contact.contactInfo.find(
        (info) => info.label === "label.mobile_number"
      )?.value;

      if (!numRegex.test(String(contactMobileNo))) {
        contactErrors.mobileNo = intl.formatMessage({
          id: "label.mobile_number_validation",
        });
        isValid = false;
      }

      const contactEmailId = contact.contactInfo.find(
        (info) => info.label === "label.email_id"
      )?.value;

      if (validateEmail(contactEmailId)) {
        contactErrors.contactEmailId = intl.formatMessage({
          id: "label.email_id_validation",
        });
        isValid = false;
      }

      if (Object.keys(contactErrors).length > 0) {
        newErrors.contactDetails[index] = contactErrors;
      }
    });
    return isValid;
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
      companyDetail: "",
      website: "",
      balanceCredit: "",
      contactDetails: [],
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
    const companyDetail = findValueByLabel(
      "label.short_profile_of_the_company"
    );
    const website = findValueByLabel("label.website");
    const entity = findValueByLabel("label.entity");
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
    if (entity === FIRM_OF_CHARTERED_ACCOUNTANTS) {
      if (
        !numRegex.test(String(registrationNo)) ||
        registrationNo.length !== FIRM_REGISTRATION_NO_LENGTH
      ) {
        newErrors.registrationNo = intl.formatMessage({
          id: "label.registration_no_validation",
        });
        isValid = false;
      }
      if (!numRegex.test(String(noOfPartners))) {
        newErrors.noOfPartners = intl.formatMessage({
          id: "label.no_of_partners_validation",
        });
        isValid = false;
      }
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
    isValid = validateContactPersonDetails(newErrors);
    const profileDataWithErrors = {
      ...profileData,
      companyDetail: profileData.companyDetail.map((detail) => ({
        ...detail,
        error: newErrors[detail?.key] || "",
      })),
      contactPersonInfo: profileData.contactPersonInfo.map(
        (contact, index) => ({
          ...contact,
          contactInfo: contact.contactInfo.map((info) => ({
            ...info,
            error:
              newErrors.contactDetails[index] &&
              newErrors.contactDetails[index][info.key]
                ? newErrors.contactDetails[index][info.key]
                : "",
          })),
        })
      ),
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

  const createPayloadFromProfileData = (profileData) => {
    const companyDetails = profileData.companyDetail.reduce((acc, detail) => {
      switch (detail.key) {
        case "companyName":
          acc.name = detail.value;
          break;
        case "entity":
          acc.entity = detail.value;
          break;
        case "address":
          acc.address = detail.value;
          break;
        case "emailId":
          acc.email = detail.value;
          break;
        case "code":
          acc.std_country_code = "+" + detail.value;
          break;
        case "telephoneNo":
          acc.telephone_number = detail.value;
          break;
      }
      return acc;
    }, {});

    companyDetails.company_details = profileData.companyProfile[0].value;
    companyDetails.website = profileData.otherDetails.find(
      (detail) => detail.key === "website"
    ).value;
    companyDetails.nature_of_suppliers = profileData.otherDetails.find(
      (detail) => detail.label === "label.nature_of_supplier"
    ).value;
    companyDetails.type = profileData.otherDetails.find(
      (detail) => detail.label === "label.company_type"
    ).value;
    companyDetails.source_of_information = profileData.sourceOfInfo;
    companyDetails.credit_amount = profileData.balanceCredit;
    companyDetails.company_logo = profileData.companyLogo;

    const contactDetails = profileData.contactPersonInfo.map((contact) => ({
      id: contact.contactInfo.find((info) => info.key === "name").id,
      modules: contact.contactModules,
      salutation: contact.contactInfo.find(
        (info) => info.label === "label.salutation"
      ).value,
      name: contact.contactInfo.find((info) => info.key === "name").value,
      email: contact.contactInfo.find((info) => info.key === "contactEmailId")
        .value,
      designation: contact.contactInfo.find(
        (info) => info.key === "designation"
      ).value,
      mobile_country_code: contact.contactInfo
        .find((info) => info.key === "mobileNo")
        .codeValue.replace(/\D/g, ""),
      mobile_number: contact.contactInfo.find((info) => info.key === "mobileNo")
        .value,
      status: contact.isContactActive ? 1 : 0,
    }));

    const payload = {
      ...companyDetails,
      contact_details: contactDetails,
    };

    return payload;
  };

  const onSaveClick = () => {
    if (validateFields()) {
      const payload = createPayloadFromProfileData(profileData);
      handleUpdateProfile(payload);
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

  const handleModuleToggle = (moduleId) => {
    const updatedModuleOptions = moduleOptions.map((item) => {
      if (item.id === moduleId) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });

    setModuleOptions(updatedModuleOptions);

    const updatedProfileData = {
      ...profileData,
      contactPersonInfo: profileData.contactPersonInfo.map((contact) => {
        const moduleIndex = contact?.contactModules[0]?.options?.findIndex(
          (module) => module.value === moduleId
        );
        const moduleSelected = moduleIndex !== -1;

        const newDefaultValues = moduleSelected
          ? contact.contactModules[0]?.defaultValues?.filter(
              (module) => module.value !== moduleId
            )
          : [...contact.contactModules[0]?.defaultValues];

        const newOptions = moduleSelected
          ? contact.contactModules[0].options.map((option) =>
              option.value === moduleId
                ? { ...option, isSelected: !option.isSelected }
                : option
            )
          : [
              ...contact.contactModules[0].options,
              { value: moduleId, label: moduleId, isDisabled: false }, // Add a new option
            ];

        return {
          ...contact,
          contactModules: contact.contactModules.map((module) => ({
            ...module,
            defaultValues: newDefaultValues,
            options: newOptions,
          })),
        };
      }),
    };

    setProfileData(updatedProfileData);
  };

  const onGoBack = () => {
    if (isEditProfile) {
      handleEdit(false);
    } else {
      navigate(PREVIOUS_SCREEN);
    }
  };

  const handleCompanyDetailChange = (fieldName, value) => {
    if (fieldName === "label.entity") {
      let updatedCompanyDetail = [...profileData.companyDetail];
      const entityIndex = updatedCompanyDetail.findIndex(
        (detail) => detail.label === "label.entity"
      );
      const registrationNoIndex = updatedCompanyDetail.findIndex(
        (detail) => detail.key === "registrationNo"
      );
      const noOfPartnersIndex = updatedCompanyDetail.findIndex(
        (detail) => detail.key === "noOfPartners"
      );

      if (value === FIRM_OF_CHARTERED_ACCOUNTANTS) {
        if (registrationNoIndex === -1) {
          updatedCompanyDetail.splice(entityIndex + 1, 0, {
            key: "registrationNo",
            label: "label.firm_registration_no",
            value: "",
            isNumeric: true,
            maxLength: 10,
            isMajor: true,
            placeholder: "label.enter_firm_no",
            isMandatory: true,
          });
        }
        if (noOfPartnersIndex === -1) {
          updatedCompanyDetail.splice(entityIndex + 2, 0, {
            key: "noOfPartners",
            label: "label.no_of_partners",
            value: "",
            isMinor: true,
            isNumeric: true,
            placeholder: "label.no_placeholder",
            isMandatory: true,
          });
        }
      } else {
        if (registrationNoIndex !== -1) {
          updatedCompanyDetail.splice(registrationNoIndex, 1);
        }
        if (noOfPartnersIndex !== -1) {
          const newNoOfPartnersIndex = updatedCompanyDetail.findIndex(
            (detail) => detail.key === "noOfPartners"
          );
          updatedCompanyDetail.splice(newNoOfPartnersIndex, 1);
        }
      }
      setProfileData({
        ...profileData,
        companyDetail: updatedCompanyDetail.map((detail) =>
          detail.label === fieldName ? { ...detail, value: value } : detail
        ),
      });
    } else {
      setProfileData({
        ...profileData,
        companyDetail: profileData.companyDetail.map((detail) =>
          detail.label === fieldName ? { ...detail, value: value } : detail
        ),
      });
    }
  };

  const handleBalanceCreditChange = (value) => {
    setProfileData({
      ...profileData,
      balanceCredit: value,
    });
  };

  const handleContactPersonInfo = (index, fieldName, value, isCode) => {
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
      if (isCode && infoIndex !== -1) {
        contactDetail.contactInfo[infoIndex].codeValue = value;
      }
      if (infoIndex !== -1 && !isCode) {
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
