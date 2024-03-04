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
  SALUTATION_OPTIONS,
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
  const [moduleUpdateWarning, setModuleUpdateWarning] = useState(false);
  const [unoccupiedModules, setUnoccupiedModules] = useState([]);
  const {
    handleUpdateProfile,
    isLoading: isUpdatingCompanyProfile,
    setUpdationError,
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
      (contact) => {
        const modulesFilled = contact?.contactModules?.every(
          (module) => module?.defaultValues?.length > 0
        );
        const infosFilled = contact.contactInfo.every(
          (info) => String(info.value).trim() !== ""
        );
        return modulesFilled && infosFilled;
      }
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

  const validateContactPersonDetails = (newErrors, isValid) => {
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
    isValid = validateContactPersonDetails(newErrors, isValid);
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
      if (detail.key) {
        switch (detail.key) {
          case "companyName":
            acc.name = detail.value;
            break;
          case "entity":
            acc.entity = detail.value;
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
    if (profileData.companyLogo) {
      companyDetails.company_logo = profileData.companyLogo;
    }

    const contactDetails = profileData.contactPersonInfo.map((contact) => ({
      id: contact.contactInfo.find((info) => info.key === "name").id,
      modules: contact.contactModules[0].value,
      salutation: contact.contactInfo.find(
        (info) => info.label === "label.salutation"
      ).value,
      name: contact.contactInfo.find((info) => info.key === "name").value,
      email: contact.contactInfo.find((info) => info.key === "contactEmailId")
        .value,
      designation: contact.contactInfo.find(
        (info) => info.key === "designation"
      ).value,
      mobile_country_code:
        "+" +
        contact.contactInfo
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
      const unoccupied = profileData.companyModuleAccess.filter(
        (moduleId) =>
          !profileData.contactPersonInfo.some((contact) =>
            contact.contactModules[0].defaultValues.some(
              (defaultValue) => defaultValue.value === moduleId
            )
          )
      );

      if (unoccupied.length > 0) {
        setUnoccupiedModules(unoccupied);
        return;
      }
      const payload = createPayloadFromProfileData(profileData);
      handleUpdateProfile(payload);
    }
  };

  const sureSaveProfile = () => {
    const payload = createPayloadFromProfileData(profileData);
    setUnoccupiedModules([]);
    handleUpdateProfile(payload);
  };

  const handleDismissToast = () => {
    setUpdationError("");
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
    const anyDefaultValueSelected = profileData.contactPersonInfo.some(
      (contact) =>
        contact.contactModules[0]?.defaultValues?.some(
          (defaultValue) => defaultValue.value === moduleId
        )
    );

    if (!anyDefaultValueSelected) {
      const updatedModuleOptions = moduleOptions.map((item) => {
        if (item.id === moduleId) {
          return { ...item, isSelected: !item.isSelected };
        }
        return item;
      });

      setModuleOptions(updatedModuleOptions);

      const updatedProfileData = {
        ...profileData,
        companyModuleAccess: profileData.companyModuleAccess.includes(moduleId)
          ? profileData.companyModuleAccess.filter((id) => id !== moduleId)
          : [...profileData.companyModuleAccess, moduleId],
        contactPersonInfo: profileData.contactPersonInfo.map((contact) => {
          const moduleIndex = contact?.contactModules[0]?.options?.findIndex(
            (module) => module.value === moduleId
          );
          const moduleSelected = moduleIndex !== -1;

          const newOptions = moduleSelected
            ? contact.contactModules[0]?.options?.filter(
                (module) => module.value !== moduleId
              )
            : [
                ...contact.contactModules[0].options,
                { value: moduleId, label: moduleId, isDisabled: false },
              ];

          return {
            ...contact,
            contactModules: contact.contactModules.map((module) => ({
              ...module,
              options: newOptions,
            })),
          };
        }),
      };

      setProfileData(updatedProfileData);
    } else {
      setModuleUpdateWarning(true);
    }
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
          detail.label === fieldName
            ? { ...detail, value: value, error: "" }
            : detail
        ),
      });
    } else {
      setProfileData({
        ...profileData,
        companyDetail: profileData.companyDetail.map((detail) =>
          detail.label === fieldName
            ? { ...detail, value: value, error: "" }
            : detail
        ),
      });
    }
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
        contactDetail.contactInfo[infoIndex].error = "";
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
      detail.label === fieldName
        ? { ...detail, value: value, error: "" }
        : detail
    );

    const updatedOtherDetails = profileData.otherDetails.map((detail) =>
      detail.label === fieldName
        ? { ...detail, value: value, error: "" }
        : detail
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

  const handleModuleWarning = () => {
    setModuleUpdateWarning((prev) => !prev);
  };

  const handleModuleAccess = (index, updatedSelectedItems) => {
    const updatedContactPersonInfo = profileData.contactPersonInfo.map(
      (contact, idx) => {
        const updatedContact = { ...contact };
        updatedContact.contactModules = contact.contactModules.map((module) => {
          const updatedModule = { ...module };
          updatedModule.options = module.options.map((option) => {
            const updatedOption = { ...option };
            if (idx !== index) {
              if (
                updatedSelectedItems.some((item) => item.value === option.value)
              ) {
                updatedOption.isDisabled = true;
              } else {
                updatedOption.isDisabled = false;
              }
            }
            return updatedOption;
          });
          if (idx === index) {
            updatedModule.defaultValues = updatedSelectedItems.map((item) => ({
              value: item.value,
              label: item.label,
            }));
          }
          return updatedModule;
        });
        return updatedContact;
      }
    );

    setProfileData({
      ...profileData,
      contactPersonInfo: updatedContactPersonInfo,
    });
  };

  const handleRemoveContactPerson = (indexToRemove) => {
    const updatedContactPersonInfo = profileData.contactPersonInfo.filter(
      (_, index) => index !== indexToRemove
    );

    setProfileData({
      ...profileData,
      contactPersonInfo: updatedContactPersonInfo,
    });
  };

  const onAddContactPerson = () => {
    const selectedModules = new Set();
    profileData.contactPersonInfo.forEach((contact) => {
      contact.contactModules[0].defaultValues.forEach((module) => {
        selectedModules.add(module.value);
      });
    });

    const newContactModuleOptions = profileData.companyModuleAccess.map(
      (module) => ({
        value: module,
        label: module,
        isDisabled: selectedModules.has(module),
      })
    );

    const newContactPerson = {
      contactModules: [
        {
          label: "label.module",
          value: [],
          showBadgeLabel: true,
          isMandatory: true,
          isMultiSelect: true,
          isDropdown: true,
          placeholder: "label.select_module",
          defaultValues: [],
          options: newContactModuleOptions,
        },
      ],
      contactInfo: [
        {
          label: "label.salutation",
          value: "",
          isDropdown: true,
          options: SALUTATION_OPTIONS,
          placeholder: "label.select",
          isMandatory: true,
        },
        {
          key: "name",
          label: "label.contact_person_name",
          value: "",
          isMandatory: true,
          maxLength: 255,
          placeholder: "label.enter_contact_person_name",
        },
        {
          key: "designation",
          label: "label.contact_personal_designation",
          value: "",
          maxLength: 500,
          isMandatory: true,
          placeholder: "label.enter_contact_person_designation",
        },
        {
          key: "mobileNo",
          label: "label.mobile_number",
          isMobileNumber: true,
          value: "",
          codeValue: "",
          options: countryCodes,
          isNumeric: true,
          isMandatory: true,
          placeholder: "label.enter_contact_person_mobile_no",
        },
        {
          key: "contactEmailId",
          label: "label.email_id",
          value: "",
          isMandatory: true,
          placeholder: "label.enter_contact_person_email_id",
        },
      ],
      isNewContactPerson: true,
    };

    setProfileData({
      ...profileData,
      contactPersonInfo: [...profileData.contactPersonInfo, newContactPerson],
    });
  };

  const handleunoccupiedModules = () => {
    setUnoccupiedModules([]);
  };

  return (
    <CompanyProfileUI
      {...{
        allFieldsFilled,
        error: errorWhileGettingResult,
        handleCompanyDetailChange,
        handleContactPersonInfo,
        handleCompanyProfile,
        handleDismissToast,
        handleEdit,
        handleModuleAccess,
        handleModuleWarning,
        handleModuleToggle,
        handleRemoveContactPerson,
        handleSwitchChange,
        handleunoccupiedModules,
        handleToggle,
        isEditProfile,
        isLoading,
        isUpdatingCompanyProfile,
        moduleOptions,
        moduleUpdateWarning,
        options,
        onAddContactPerson,
        onGoBack,
        onSaveClick,
        profileResult: profileData,
        unoccupiedModules,
        updationError,
        sureSaveProfile,
      }}
    />
  );
};

export default CompanyProfileComponent;
