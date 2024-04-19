import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { mapApiDataToUI } from "../mappedData";
import { validateFields } from "../../../../../views/CompanyProfile/CompanyProfileUtils";
import useIsWebView from "../../../../../hooks/useIsWebView";
import useFetch from "../../../../../hooks/useFetch";
import useSaveLogo from "../../../../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useDeleteLogo from "../../../../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";
import {
  APPLICATION,
  CORE_INDUSTRY_TYPE,
  COUNTRY_CODE,
  PROFILE,
  ROUNDS,
  USER_TYPE_COMPANY,
} from "../../../../../services/apiServices/apiEndPoint";
import {
  FIRM_OF_CHARTERED_ACCOUNTANTS,
  INTEREST_OPTIONS,
  NUMBER_OF_PARTNERS_LENGTH,
} from "../../../../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../../constants/errorMessages";
import { gridStyles } from "../../../../../theme/styles/commonStyles";
import { SideBarContext } from "../../../../../globalContext/sidebar/sidebarProvider";
import { useParams } from "react-router";
import { usePatch } from "../../../../../hooks/useApiRequest";

const useCompanyProfile = ({ tabHandler }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [sideBarState] = useContext(SideBarContext);
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const { id } = useParams();

  const [formDetails, setFormDetails] = useState();
  const [options, setOptions] = useState(
    INTEREST_OPTIONS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
      isSelected: false,
    }))
  );

  const isEditProfile = true;
  const currentModule = sideBarState?.selectedModule?.key;

  const columnCount = isWebView && gridStyles[currentBreakpoint];

  const {
    data: countryCodes,
    isLoading: isCountryCodeLoading,
    isError: isErrorGettingCountryCodes,
    error: errorGettingCountryCodes,
    fetchData: getCountryCodes,
  } = useFetch({
    url: COUNTRY_CODE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const {
    data: industryOptions,
    isLoading: isIndustryTypeLoading,
    isError: isErrorGettingIndustries,
    error: errorGettingIndustries,
    fetchData: getIndustryType,
  } = useFetch({
    url: CORE_INDUSTRY_TYPE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: personalProfileData,
    isLoading: isProfileDataLoading,
    isError: isErrorProfileData,
    error: errorWhileGettingProfileData,
    fetchData: getProfileData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      PROFILE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const {
    makeRequest: updateProfileData,
    error: errorWhileUpdating,
    setError: setErrorWhileUpdating,
    isLoading: isProfileUpdating,
    isError: isErrorWhileUpdating,
  } = usePatch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      PROFILE,
  });

  const { handleDeleteLogo, errorWhileDeletion, setErrorWhileDeletion } =
    useDeleteLogo();
  const {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    setFileUploadResult,
    uploadPercentage,
  } = useSaveLogo();

  useEffect(() => {
    const fetchPersonalData = async () => {
      const newCountryCode = await getCountryCodes();
      const newIndustryType = await getIndustryType();
      const newProfileData = await getProfileData();
      setFormDetails(
        mapApiDataToUI({
          apiData: newProfileData,
          industryOptions: newIndustryType,
          intl,
          countryCodes: newCountryCode,
          isEditMode: true,
        })
      );
      const updatedInfoOptions = INTEREST_OPTIONS.map((option) => ({
        ...option,
        title: intl.formatMessage({ id: option.messageId }),
        isSelected: newProfileData.source_of_information?.includes(
          intl.formatMessage({ id: option.messageId })
        ),
      }));
      setOptions(updatedInfoOptions);
    };
    if (currentModule) {
      fetchPersonalData();
    }
  }, [currentModule]);

  const handleInputChange = (fieldName, value) => {
    if (fieldName === "label.entity") {
      let updatedCompanyDetail = [...formDetails.companyDetail];
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
            maxLength: NUMBER_OF_PARTNERS_LENGTH,
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
      setFormDetails({
        ...formDetails,
        companyDetail: updatedCompanyDetail.map((detail) =>
          detail.label === fieldName
            ? { ...detail, value: value, error: "" }
            : detail
        ),
      });
    } else {
      setFormDetails({
        ...formDetails,
        companyDetail: formDetails.companyDetail.map((detail) =>
          detail.label === fieldName
            ? { ...detail, value: value, error: "" }
            : detail
        ),
      });
    }
  };

  const handleContactPersonInfo = (index, fieldName, value, isCode) => {
    const updatedProfileData = { ...formDetails };
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
      setFormDetails(updatedProfileData);
    }
  };

  const handleCompanyProfile = (fieldName, value) => {
    const updatedCompanyProfile = formDetails.companyProfile.map((detail) =>
      detail.label === fieldName
        ? { ...detail, value: value, error: "" }
        : detail
    );

    const updatedOtherDetails = formDetails.otherDetails.map((detail) =>
      detail.label === fieldName
        ? { ...detail, value: value, error: "" }
        : detail
    );

    setFormDetails({
      ...formDetails,
      companyProfile: updatedCompanyProfile,
      otherDetails: updatedOtherDetails,
    });
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
      updatedSourceOfInfo = [...formDetails.sourceOfInfo, toggledItem.title];
    } else {
      updatedSourceOfInfo = formDetails.sourceOfInfo.filter(
        (title) => title !== toggledItem.title
      );
    }
    setFormDetails({
      ...formDetails,
      sourceOfInfo: updatedSourceOfInfo,
    });

    setOptions(updatedItems);
  };

  const handleBlur = (name, index) => {
    validateFields({
      field: name,
      index,
      intl,
      profileData: formDetails,
      setProfileData: setFormDetails,
    });
  };

  const isLoading =
    isCountryCodeLoading || isIndustryTypeLoading || isProfileDataLoading;

  const getErrorDetails = () => {
    if (
      isErrorGettingIndustries &&
      isErrorGettingCountryCodes &&
      isProfileDataLoading
    ) {
      let errorMessage = "";
      if (
        errorGettingIndustries === GENERIC_GET_API_FAILED_ERROR_MESSAGE &&
        errorGettingCountryCodes === GENERIC_GET_API_FAILED_ERROR_MESSAGE &&
        errorWhileGettingProfileData == GENERIC_GET_API_FAILED_ERROR_MESSAGE
      ) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorGettingIndustries} , ${errorGettingCountryCodes} ,${errorWhileGettingProfileData}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          getCountryCodes();
          getIndustryType();
          getProfileData();
        },
      };
    }
    if (isErrorGettingIndustries)
      return {
        errorMessage: errorGettingIndustries?.data?.message,
        onRetry: getIndustryType,
      };
    if (isErrorGettingCountryCodes)
      return {
        errorMessage: errorGettingCountryCodes?.data?.message,
        onRetry: getCountryCodes,
      };
    if (isProfileDataLoading)
      return {
        errorMessage: errorWhileGettingProfileData?.data?.message,
        onRetry: getProfileData,
      };
    return {
      errorMessage: "",
      onRetry: () => {},
    };
  };

  const handleImageDeletion = () => {
    if (formDetails?.companyLogo) {
      setFormDetails((prevProfileData) => ({
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
          case "currentIndustry":
            acc.industry_type_id = detail.value;
            break;
          case "code":
            acc.std_country_code = detail.value;
            break;
          case "telephoneNo":
            acc.telephone_number = detail.value;
            break;
          case "registrationNo":
            acc.frn_number = detail.value;
            break;
          case "noOfPartners":
            acc.number_of_partners = detail.value;
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
      status: contact?.isContactActive || contact?.isNewContactPerson ? 1 : 0,
    }));

    const payload = {
      ...companyDetails,
      contact_details: contactDetails[0],
    };

    return payload;
  };

  const handleSaveAndNext = () => {
    const payLoad = createPayloadFromProfileData(formDetails);
    updateProfileData({
      body: payLoad,
      onSuccessCallback: () => {
        tabHandler("next");
      },
    });
  };

  return {
    countryCodes,
    columnCount,
    formDetails,
    errorWhileUpload,
    getErrorDetails,
    handleInputChange,
    handleSaveAndNext,
    handleContactPersonInfo,
    handleCompanyProfile,
    handleBlur,
    handleToggle,
    handleFileUpload,
    industryOptions,
    errorWhileUpdating,
    setErrorWhileUpdating,
    isProfileUpdating,
    isErrorWhileUpdating,
    isEditProfile,
    isLoading,
    isUploadingImageToServer,
    options,
    onDeleteImage: handleImageDeletion,
    setFileUploadResult,
    setFormDetails,
    uploadImageToServerUtils: {
      fileUploadResult,
      handleFileUpload,
      isUploadingImageToServer,
      setFileUploadResult,
      uploadPercentage,
    },
    uploadPercentage,
  };
};

export default useCompanyProfile;
