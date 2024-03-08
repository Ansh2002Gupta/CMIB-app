import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import CompanyProfileUI from "./CompanyProfileUI";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useGetCompanyProfileAPI from "../../services/apiServices/hooks/CompanyProfile/useGetCompanyProfileAPI";
import useDeleteLogo from "../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";
import useFetch from "../../hooks/useFetch";
import useIndustryTypes from "../../services/apiServices/hooks/useIndustryTypes";
import useSaveLogo from "../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useUpdateCompanyProfile from "../../services/apiServices/hooks/CompanyProfile/useUpdateCompanyProfileAPI";
import {
  FIRM_OF_CHARTERED_ACCOUNTANTS,
  INTEREST_OPTIONS,
  MODULE_OPTIONS,
  PREVIOUS_SCREEN,
  SALUTATION_OPTIONS,
} from "../../constants/constants";
import { COUNTRY_CODE } from "../../services/apiServices/apiEndPoint";
import { mapApiDataToUI } from "./mappedData";
import { validateFields } from "./CompanyProfileUtils";

const CompanyProfileComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [userProfileState] = useContext(UserProfileContext);

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [moduleUpdateWarning, setModuleUpdateWarning] = useState(false);
  const [unoccupiedModules, setUnoccupiedModules] = useState([]);
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

  const { handleDeleteLogo, errorWhileDeletion, setErrorWhileDeletion } =
    useDeleteLogo();
  const { data: countryCodes } = useFetch({ url: COUNTRY_CODE });
  const { errorWhileGettingResult, onGetProfile, profileResult, isLoading } =
    useGetCompanyProfileAPI();
  const { getIndustryTypes, industryTypeResult } = useIndustryTypes();
  const {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    setFileUploadResult,
    uploadPercentage,
  } = useSaveLogo();
  const {
    handleUpdateProfile,
    isLoading: isUpdatingCompanyProfile,
    setUpdationError,
    updationError,
  } = useUpdateCompanyProfile();

  useEffect(() => {
    onGetProfile();
  }, []);

  useEffect(() => {
    if (profileResult) {
      setProfileData(
        mapApiDataToUI({
          apiData: profileResult,
          industryOptions: industryTypeResult,
          intl,
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

  const handleImageDeletion = () => {
    if (profileData?.companyLogo) {
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        companyLogo: "",
      }));
    }
    if (fileUploadResult?.data?.file_name) {
      const fileName = fileUploadResult?.data?.file_name.split("/");
      handleDeleteLogo(fileName[fileName.length - 1]);
    }
  };

  const getContactPersonDetails = ({ data, dataKeyName = "key", keyName }) => {
    return data.find((info) => info[dataKeyName] === keyName);
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
            break;
          case "address":
            acc.address = detail.value;
            break;
          case "emailId":
            acc.email = detail.value;
            break;
          case "code":
            acc.std_country_code = detail.value;
            break;
          case "telephoneNo":
            acc.telephone_number = detail.value;
            break;
          default:
            break;
        }
      }
      return acc;
    }, {});

    companyDetails.company_details = profileData?.companyProfile?.[0]?.value;
    companyDetails.website = profileData?.otherDetails?.find(
      (detail) => detail.key === "website"
    ).value;
    companyDetails.nature_of_suppliers = profileData?.otherDetails?.find(
      (detail) => detail.label === "label.nature_of_supplier"
    ).value;
    companyDetails.type = profileData?.otherDetails?.find(
      (detail) => detail.label === "label.company_type"
    ).value;
    companyDetails.source_of_information = profileData?.sourceOfInfo;
    companyDetails.credit_amount = profileData?.balanceCredit;
    if (fileUploadResult?.data?.file_name || profileData?.companyLogo) {
      const logoFileName = profileData?.companyLogo?.split("/")?.pop();
      companyDetails.company_logo =
        fileUploadResult?.data?.file_name || logoFileName;
    } else {
      companyDetails.company_logo = null;
    }

    const contactDetails = profileData?.contactPersonInfo?.map((contact) => ({
      id: getContactPersonDetails({
        data: contact?.contactInfo,
        keyName: "name",
      })?.id,
      modules: contact?.contactModules?.[0].value,
      salutation: getContactPersonDetails({
        data: contact?.contactInfo,
        dataKeyName: "label",
        keyName: "label.salutation",
      })?.value,
      name: getContactPersonDetails({
        data: contact?.contactInfo,
        keyName: "name",
      })?.value,
      email: getContactPersonDetails({
        data: contact?.contactInfo,
        keyName: "contactEmailId",
      })?.value,
      designation: getContactPersonDetails({
        data: contact?.contactInfo,
        keyName: "designation",
      })?.value,
      mobile_country_code:
        "+" +
        getContactPersonDetails({
          data: contact?.contactInfo,
          keyName: "mobileNo",
        })?.codeValue.replace(/\D/g, ""),
      mobile_number: getContactPersonDetails({
        data: contact?.contactInfo,
        keyName: "mobileNo",
      })?.value,
      status: contact?.isContactActive ? 1 : 0,
    }));

    const payload = {
      ...companyDetails,
      contact_details: contactDetails,
    };

    return payload;
  };

  const onProfileUpdate = () => {
    setIsEditProfile(false);
    fileUploadResult && setFileUploadResult("");
    onGetProfile();
  };

  const onSaveClick = () => {
    if (validateFields({ intl, profileData, setProfileData })) {
      const unoccupied = profileData.companyModuleAccess.filter(
        (moduleId) =>
          !profileData.contactPersonInfo.some((contact) =>
            contact.contactModules?.[0].defaultValues.some(
              (defaultValue) => defaultValue.value === moduleId
            )
          )
      );

      if (unoccupied.length > 0) {
        setUnoccupiedModules(unoccupied);
        return;
      }
      const payload = createPayloadFromProfileData(profileData);
      handleUpdateProfile(payload, onProfileUpdate);
    }
  };

  const sureSaveProfile = () => {
    const payload = createPayloadFromProfileData(profileData);
    setUnoccupiedModules([]);
    handleUpdateProfile(payload, onProfileUpdate);
  };

  const handleDismissToast = () => {
    setUpdationError("");
    setErrorWhileDeletion("");
    setErrorWhileUpload("");
  };

  const handleToggle = (id) => {
    const updatedItems = options.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });

    const toggledItem = updatedItems.find((item) => item.id === id);

    let updatedSourceOfInfo;
    if (toggledItem.isSelected) {
      updatedSourceOfInfo = [...profileData.sourceOfInfo, toggledItem.title];
    } else {
      updatedSourceOfInfo = profileData.sourceOfInfo.filter(
        (title) => title !== toggledItem.title
      );
    }
    setProfileData({
      ...profileData,
      sourceOfInfo: updatedSourceOfInfo,
    });

    setOptions(updatedItems);
  };
  const handleModuleToggle = (moduleId) => {
    const moduleOption = MODULE_OPTIONS.find(
      (option) => option.id === moduleId
    );

    const label = moduleOption
      ? intl.formatMessage({
          id: moduleOption.messageId,
        })
      : "";

    const anyDefaultValueSelected = profileData.contactPersonInfo.some(
      (contact) =>
        contact.contactModules?.[0]?.defaultValues?.some(
          (defaultValue) => defaultValue.label === moduleId
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
        companyModuleAccess: profileData.companyModuleAccess.includes(label)
          ? profileData.companyModuleAccess.filter((id) => id !== label)
          : [...profileData.companyModuleAccess, label],
        contactPersonInfo: profileData?.contactPersonInfo?.map((contact) => {
          const moduleIndex = contact?.contactModules?.[0]?.options?.findIndex(
            (module) => module.name === moduleId
          );
          const moduleSelected = moduleIndex !== -1;

          const newOptions = moduleSelected
            ? contact.contactModules?.[0]?.options?.filter(
                (module) => module.name !== moduleId
              )
            : [
                ...contact.contactModules?.[0].options,
                {
                  name: moduleId,
                  value: label,
                  label: label,
                  selectedIndex: null,
                  isSelected: false,
                },
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
      fileUploadResult && setFileUploadResult("");
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
    const updatedContactPersonInfo = profileData?.contactPersonInfo?.map(
      (contact, idx) => {
        if (idx === index) {
          const isContactActive = !contact.isContactActive;
          const updatedContactModules = isContactActive
            ? contact.contactModules
            : contact.contactModules.map((module) => ({
                ...module,
                defaultValues: [],
                value: [],
                options: module.options.map((option) => ({
                  ...option,
                  isSelected:
                    index === option.selectedIndex ? false : option.isSelected,
                  selectedIndex:
                    index === option.selectedIndex
                      ? null
                      : option.selectedIndex,
                })),
              }));

          return {
            ...contact,
            isContactActive: isContactActive,
            contactModules: updatedContactModules,
          };
        }
        const updatedContactModules = contact.contactModules.map((module) => ({
          ...module,
          options: module.options.map((option) =>
            option.selectedIndex === index
              ? {
                  ...option,
                  isSelected: false,
                  selectedIndex: null,
                }
              : option
          ),
        }));
        return {
          ...contact,
          contactModules: updatedContactModules,
        };
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
    const moduleOption = MODULE_OPTIONS.find(
      (option) =>
        intl.formatMessage({
          id: option.messageId,
        }) === updatedSelectedItems
    );
    const moduleId = moduleOption ? moduleOption.id : "";

    const updatedContactPersonInfo = profileData?.contactPersonInfo?.map(
      (contact, idx) => {
        const updatedContact = { ...contact };
        updatedContact.contactModules = contact.contactModules.map((module) => {
          const updatedModule = { ...module };
          updatedModule.options = module.options.map((option) => {
            const updatedOption = { ...option };
            if (
              option.value === updatedSelectedItems &&
              (option.isSelected || option.selectedIndex === index)
            ) {
              updatedOption.isSelected = false;
              updatedOption.selectedIndex = null;
            }
            if (
              option.value === updatedSelectedItems &&
              option.selectedIndex === null &&
              idx === index
            ) {
              updatedOption.isSelected = true;
              updatedOption.selectedIndex = idx;
            }
            if (
              option.value === updatedSelectedItems &&
              option.selectedIndex === null &&
              idx !== index
            ) {
              updatedOption.isSelected = false;
              updatedOption.selectedIndex = index;
            }
            return updatedOption;
          });
          if (idx === index) {
            const itemIndex = updatedModule.defaultValues.findIndex(
              (item) => item.value === updatedSelectedItems
            );
            if (itemIndex > -1) {
              updatedModule.defaultValues.splice(itemIndex, 1);
            } else {
              updatedModule.defaultValues.push({
                value: updatedSelectedItems,
                label: moduleId,
                name: updatedSelectedItems,
              });
            }
            const valueIndex = updatedModule.value?.findIndex(
              (value) => value === moduleId
            );
            if (valueIndex > -1) {
              updatedModule.value.splice(valueIndex, 1);
            } else {
              updatedModule.value = updatedModule.value || [];
              updatedModule.value.push(moduleId);
            }
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
      contact.contactModules?.[0].defaultValues.forEach((module) => {
        selectedModules.add(module.value);
      });
    });

    const newContactModuleOptions = profileData.companyModuleAccess.map(
      (module) => ({
        value: module,
        label: module,
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
        currentUser: userProfileState?.userDetails?.email,
        error: errorWhileGettingResult,
        errorWhileDeletion,
        errorWhileUpload,
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
        onDeleteImage: handleImageDeletion,
        onGoBack,
        onSaveClick,
        profileResult: profileData,
        unoccupiedModules,
        updationError,
        uploadImageToServerUtils: {
          fileUploadResult,
          handleFileUpload,
          isUploadingImageToServer,
          setFileUploadResult,
          uploadPercentage,
        },
        sureSaveProfile,
      }}
    />
  );
};

export default CompanyProfileComponent;
