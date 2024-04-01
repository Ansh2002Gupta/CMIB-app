import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { mapApiDataToUI } from "../../../../../views/CompanyProfile/mappedData";
import { validateFields } from "../../../../../views/CompanyProfile/CompanyProfileUtils";
import useIsWebView from "../../../../../hooks/useIsWebView";
import useFetch from "../../../../../hooks/useFetch";
import {
  CORE_INDUSTRY_TYPE,
  COUNTRY_CODE,
} from "../../../../../services/apiServices/apiEndPoint";
import {
  FIRM_OF_CHARTERED_ACCOUNTANTS,
  INTEREST_OPTIONS,
  NUMBER_OF_PARTNERS_LENGTH,
} from "../../../../../constants/constants";
import { gridStyles } from "../../../../../theme/styles/commonStyles";

const profiledata = {
  id: 14,
  name: "Pankaj Kachhwaye",
  entity: "Corporate",
  frn_number: null,
  number_of_partners: null,
  industry_type: {
    id: 1,
    name: "Diversified",
  },
  address: "123 Business Road, Suite 456, Business City, BC 12345",
  email: "pankajkachhwaye@gmail.com",
  std_country_code: "+91",
  telephone_number: "12345678",
  company_module_access: [],
  contact_details: [
    {
      id: 7,
      salutation: "Mr.",
      name: "Pankaj",
      designation: "sdfasdf",
      email: "pankajkachhwaye@gmail.com",
      mobile_country_code: "+93",
      mobile_number: "1122334455",
      modules: [],
      status: null,
    },
  ],
  company_details: "This is a test company",
  website: "www.testcompany.com",
  nature_of_suppliers: "Registered",
  type: null,
  source_of_information: ["Campus"],
  credit_amount: 2000000000,
  company_logo: null,
  updated_at: "2024-03-19T07:36:56.000000Z",
};

const useCompanyProfile = () => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  const [formDetails, setFormDetails] = useState();
  const [options, setOptions] = useState(
    INTEREST_OPTIONS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
      isSelected: false,
    }))
  );

  const isEditProfile = true;

  const columnCount = isWebView && gridStyles[currentBreakpoint];

  const {
    data: countryCodes,
    isLoading: isCountryCodeLoading,
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
    fetchData: getIndustryType,
  } = useFetch({
    url: CORE_INDUSTRY_TYPE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(async () => {
    const newIndustyOptions = await getIndustryType();
    const newCountryCode = await getCountryCodes();
    setFormDetails(
      mapApiDataToUI({
        apiData: profiledata,
        industryOptions: newIndustyOptions,
        intl,
        countryCodes: newCountryCode,
        isEditMode: true,
      })
    );
  }, []);

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

  console.log("formDetails", formDetails);

  return {
    countryCodes,
    columnCount,
    formDetails,
    handleInputChange,
    handleContactPersonInfo,
    handleCompanyProfile,
    handleBlur,
    handleToggle,
    industryOptions,
    isEditProfile,
    options,
    setFormDetails,
  };
};

export default useCompanyProfile;
