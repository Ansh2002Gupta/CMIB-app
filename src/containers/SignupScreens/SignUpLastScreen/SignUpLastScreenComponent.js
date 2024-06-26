import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "../../../routes";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpLastScreenUI from "./SignUpLastScreenUI";
import useDeleteLogo from "../../../services/apiServices/hooks/CompanyLogo/useDeleteLogoAPI";
import useSignUpUser from "../../../services/apiServices/hooks/SignUp/useSignUpUser";
import useSaveLogo from "../../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useValidateSignUp from "../../../services/apiServices/hooks/SignUp/useValidateSignUp";
import { navigations } from "../../../constants/routeNames";
import { isValidUrl, scrollToRef } from "../../../utils/util";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import {
  setSignUpDetails,
  resetSignUpDetails,
} from "../../../globalContext/signUp/signUpActions";
import {
  COMPANY_DETAIL_MAX_LENGTH,
  DEFAULT_INPUT_MAX_LENGTH,
  INTEREST_OPTIONS,
} from "../../../constants/constants";

const SignUpLastScreenComponent = ({ tabHandler }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const initialDetails = signUpState.signUpDetail || [];

  const [showSuccessSignUp, setShowSuccessSignUp] = useState(false); //useState hooks (separated by a line above because they can be multiple)
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: initialDetails.social_media_link?.facebook || "",
    linkedin: initialDetails.social_media_link?.linkedIn || "",
    twitter: initialDetails.social_media_link?.twitter || "",
    youtube: initialDetails.social_media_link?.youtube || "",
  });
  const [companyDetails, setCompanyDetails] = useState(
    initialDetails.company_details || ""
  );
  const [website, setWebsite] = useState(initialDetails.website || "");
  const [natureOfSupplier, setNatureOfSupplier] = useState(
    initialDetails.nature_of_suppliers || ""
  );
  const [companyType, setCompanyType] = useState(initialDetails.type || "");
  const [options, setOptions] = useState(
    INTEREST_OPTIONS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
      isSelected:
        initialDetails.source_of_information?.includes(
          intl.formatMessage({ id: option.messageId })
        ) || false,
    }))
  );
  const [errors, setErrors] = useState({
    socialMediaLinks: {
      facebook: "",
      linkedIn: "",
      twitter: "",
      youtube: "",
    },
    companyDetails: "",
    website: "",
  });

  const facebookRef = useRef(null);
  const linkedInRef = useRef(null);
  const twitterRef = useRef(null);
  const youtubeRef = useRef(null);

  const companyDetailsRef = useRef(null);
  const websiteRef = useRef(null);

  const {
    handleSignUpValidation,
    isLoading,
    validationError,
    setValidationError,
  } = useValidateSignUp();

  const {
    handleSignUp,
    isLoading: isRegisteringUser,
    setSignUpError,
    signUpError,
  } = useSignUpUser();

  const {
    errorWhileUpload,
    fileUploadResult,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
    setFileUploadResult,
    uploadPercentage,
  } = useSaveLogo();

  const { handleDeleteLogo, errorWhileDeletion, setErrorWhileDeletion } =
    useDeleteLogo();

  const handleImageDeletion = () => {
    if (fileUploadResult?.data?.file_name) {
      const fileName = fileUploadResult?.data?.file_name.split("/");
      handleDeleteLogo(fileName[fileName.length - 1]);
    }
  };

  const allFieldsFilled = () => {
    const requiredFields = [
      companyDetails,
      website,
      natureOfSupplier,
      companyType,
    ];
    const isAtLeastOneInterestSelected = options.some(
      (option) => option.isSelected
    );

    return (
      requiredFields.every((field) => String(field).trim() !== "") &&
      isAtLeastOneInterestSelected
    );
  };

  const getSocialMediaRef = (key) => {
    switch (key) {
      case "facebook":
        return facebookRef;
      case "linkedin":
        return linkedInRef;
      case "youtube":
        return youtubeRef;
      case "twitter":
        return twitterRef;
      default:
        return null;
    }
  };

  const validateFields = ({ name, shouldSrollToError, value }) => {
    let isValid = true;
    let newErrors = {
      socialMediaLinks: {
        facebook: "",
        linkedIn: "",
        twitter: "",
        youtube: "",
      },
      companyDetails: "",
      website: "",
    };

    Object.keys(socialMediaLinks).forEach((key) => {
      if (socialMediaLinks[key] && !isValidUrl(String(socialMediaLinks[key]))) {
        newErrors.socialMediaLinks[key] = intl.formatMessage({
          id: "label.url_validation",
        });
        if (shouldSrollToError && isValid) {
          scrollToRef(getSocialMediaRef(key));
        }
        isValid = false;
      }
    });

    if (!name || name === "companyDetails") {
      const enteredCompanyDetails = value || companyDetails;
      if (
        enteredCompanyDetails.trim().length < DEFAULT_INPUT_MAX_LENGTH ||
        enteredCompanyDetails.trim().length > COMPANY_DETAIL_MAX_LENGTH
      ) {
        newErrors.companyDetails = intl.formatMessage({
          id: "label.company_details_validation",
        });
        if (shouldSrollToError && isValid) {
          scrollToRef(companyDetailsRef);
        }
        isValid = false;
      }
    }

    if (!name || name === "website") {
      const enteredWebsite = value || website;
      if (!isValidUrl(String(enteredWebsite))) {
        newErrors.website = intl.formatMessage({
          id: "label.url_validation",
        });
        if (shouldSrollToError && isValid) {
          scrollToRef(websiteRef);
        }
        isValid = false;
      }
    }

    if (name && newErrors[name] !== undefined) {
      setErrors({
        ...errors,
        [name]: newErrors[name],
      });
    } else {
      setErrors(newErrors);
    }
    return isValid;
  };

  const handleInputChange = (value, name) => {
    if (name in socialMediaLinks) {
      setSocialMediaLinks({
        ...socialMediaLinks,
        [name]: value,
      });
    } else {
      switch (name) {
        case "companyDetails":
          setCompanyDetails(value);
          break;
        case "website":
          setWebsite(value);
          break;
        case "companyType":
          setCompanyType(value);
          break;
        case "natureOfSupplier":
          setNatureOfSupplier(value);
          break;
        default:
          break;
      }
    }
    errors[name] && validateFields({ value, name });
  };

  const onSuccess = async (details) => {
    signUpDispatch(setSignUpDetails(details));
    const updatedDetails = { ...initialDetails, ...details };
    const contactDetails = updatedDetails?.contact_details;
    const payloadContactDetails = {
      contact_details: contactDetails?.map((item) => {
        return {
          ...item,
          mobile_country_code: item?.mobile_country_code?.split(" ")?.[0],
        };
      }),
    };
    const payloadData = {
      ...updatedDetails,
      contact_details: payloadContactDetails?.contact_details,
    };
    handleSignUp(payloadData, () => setShowSuccessSignUp(true));
  };

  const constructDetailsObject = () => {
    return {
      social_media_link: socialMediaLinks,
      website: website,
      nature_of_suppliers: natureOfSupplier,
      type: companyType,
      company_details: companyDetails,
      company_logo: fileUploadResult?.data?.file_name,
      source_of_information: options
        .filter((item) => item.isSelected)
        .map((item) => item.title),
    };
  };

  const handleSuccessModal = (value) => {
    if (value) {
      if (validateFields({ shouldSrollToError: true })) {
        const details = constructDetailsObject();
        handleSignUpValidation(details, () => onSuccess(details));
      }
    } else {
      setShowSuccessSignUp(false);
    }
  };

  const handleDismissToast = () => {
    setValidationError("");
    setSignUpError("");
    setErrorWhileDeletion("");
    setErrorWhileUpload("");
  };

  const onClickGoToLogin = () => {
    handleSuccessModal(false);
    signUpDispatch(resetSignUpDetails());
    navigate(navigations.LOGIN, { state: { activeTab: true } });
  };

  const onGoBack = () => {
    const details = constructDetailsObject();
    signUpDispatch(setSignUpDetails(details));
    tabHandler("prev");
  };

  const validateField = (name) => {
    let value;
    let error = "";

    if (name in socialMediaLinks) {
      value = socialMediaLinks[name];
      if (value && !isValidUrl(String(value))) {
        error = intl.formatMessage({
          id: "label.url_validation",
        });
      }
    } else {
      switch (name) {
        case "companyDetails":
          value = companyDetails;
          if (
            value &&
            (value.length < DEFAULT_INPUT_MAX_LENGTH ||
              value.length > COMPANY_DETAIL_MAX_LENGTH)
          ) {
            error = intl.formatMessage({
              id: "label.company_details_validation",
            });
          }
          break;
        case "website":
          value = website;
          if (value && !isValidUrl(String(value))) {
            error = intl.formatMessage({
              id: "label.url_validation",
            });
          }
          break;
        default:
          break;
      }
    }
    return error;
  };

  const handleBlur = (name) => {
    const fieldError = validateField(name);
    const updatedErrors = { ...errors };
    if (name in socialMediaLinks) {
      updatedErrors.socialMediaLinks[name] = fieldError;
    } else {
      updatedErrors[name] = fieldError;
    }
    setErrors(updatedErrors);
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

  return (
    <SignUpLastScreenUI
      allFieldsFilled={allFieldsFilled}
      companyDetails={companyDetails}
      companyDetailsRef={companyDetailsRef}
      companyType={companyType}
      errors={errors}
      errorWhileDeletion={errorWhileDeletion}
      errorWhileUpload={errorWhileUpload}
      getSocialMediaRef={getSocialMediaRef}
      handleBlur={handleBlur}
      handleDismissToast={handleDismissToast}
      handleInputChange={handleInputChange}
      handleToggle={handleToggle}
      handleSuccessModal={handleSuccessModal}
      intl={intl}
      isLoading={isLoading || isRegisteringUser}
      natureOfSupplier={natureOfSupplier}
      onClickGoToLogin={onClickGoToLogin}
      onGoBack={onGoBack}
      options={options}
      onDeleteImage={handleImageDeletion}
      showSuccessSignUp={showSuccessSignUp}
      signUpError={signUpError}
      socialMediaLinks={socialMediaLinks}
      uploadImageToServerUtils={{
        fileUploadResult,
        handleFileUpload,
        isUploadingImageToServer,
        setFileUploadResult,
        uploadPercentage,
      }}
      validationError={validationError}
      website={website}
      websiteRef={websiteRef}
    />
  );
};

SignUpLastScreenComponent.propTypes = {
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpLastScreenComponent;
