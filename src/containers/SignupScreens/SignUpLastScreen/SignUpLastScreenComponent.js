import React, { useState, useContext } from "react";
import { useNavigate } from "../../../routes";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpLastScreenUI from "./SignUpLastScreenUI";
import useDeleteLogo from "../../../services/apiServices/hooks/useDeleteLogoAPI";
import useSignUpUser from "../../../services/apiServices/hooks/SignUp/useSignUpUser";
import useSaveLogo from "../../../services/apiServices/hooks/useSaveLogoAPI";
import useValidateSignUp from "../../../services/apiServices/hooks/SignUp/useValidateSignUp";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import {
  setSignUpDetails,
  resetSignUpDetails,
} from "../../../globalContext/signUp/signUpActions";
import {
  urlRegex,
  COMPANY_DETAIL_MAX_LENGTH,
  FIELD_MIN_LENGTH,
  INTEREST_OPTIONS,
} from "../../../constants/constants";

const SignUpLastScreenComponent = ({ tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const { handleSignUpValidation } = useValidateSignUp();
  const { handleSignUp } = useSignUpUser();
  const { handleDeleteLogo } = useDeleteLogo();
  const { handleFileUpload, fileUploadResult } = useSaveLogo();
  const initialDetails = signUpState.signUpDetail || [];
  const [showSuccessSignUp, setShowSuccessSignUp] = useState(false);
  const [validationError, setValidationError] = useState("");

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
    initialDetails.nature_of_supplier || ""
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

  const navigate = useNavigate();

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

  const handleImageDeletion = (handleDeletionSuccess) => {
    if (fileUploadResult?.data?.file_name) {
      handleDeleteLogo(
        {
          file_path: fileUploadResult?.data?.file_name,
        },
        handleDeletionSuccess,
        (error) => onError(error)
      );
    }
  };

  const allFieldsFilled = () => {
    const requiredFields = [
      companyDetails,
      website,
      natureOfSupplier,
      companyType,
    ];
    return requiredFields.every((field) => String(field).trim() !== "");
  };

  const validateFields = () => {
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
      if (
        socialMediaLinks[key] &&
        !urlRegex.test(String(socialMediaLinks[key]))
      ) {
        newErrors.socialMediaLinks[key] = intl.formatMessage({
          id: "label.url_validation",
        });
        isValid = false;
      }
    });

    if (
      companyDetails.length < FIELD_MIN_LENGTH ||
      companyDetails.length > COMPANY_DETAIL_MAX_LENGTH
    ) {
      newErrors.companyDetails = intl.formatMessage({
        id: "label.company_details_validation",
      });
      isValid = false;
    }

    if (!urlRegex.test(String(website))) {
      newErrors.website = intl.formatMessage({
        id: "label.url_validation",
      });
      isValid = false;
    }

    setErrors(newErrors);
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
  };

  const handleImageUpload = (file, handleUploadSuccess) => {
    handleFileUpload(file, handleUploadSuccess, (error) => onError(error));
  };

  const onError = (err) => {
    setValidationError(err);
  };

  const onSuccess = async (details) => {
    signUpDispatch(setSignUpDetails(details));
    const updatedDetails = { ...initialDetails, ...details };
    handleSignUp(
      updatedDetails,
      () => setShowSuccessSignUp(true),
      (error) => onError(error)
    );
  };

  const handleSuccessModal = (value) => {
    if (value) {
      if (validateFields() && fileUploadResult) {
        const details = {
          social_media_link: socialMediaLinks,
          website: website,
          nature_of_supplier: natureOfSupplier,
          type: companyType,
          company_details: companyDetails,
          company_logo: fileUploadResult?.data?.file_name,
          source_of_information: options
            .filter((item) => item.isSelected)
            .map((item) => item.title),
        };

        handleSignUpValidation(
          details,
          () => onSuccess(details),
          (error) => onError(error)
        );
      }
    } else {
      setShowSuccessSignUp(false);
    }
  };

  const handleDismissToast = () => {
    setValidationError("");
  };

  const onClickGoToLogin = () => {
    handleSuccessModal(false);
    signUpDispatch(resetSignUpDetails());
    navigate("/");
  };

  const onGoBack = () => {
    tabHandler("prev");
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
      companyType={companyType}
      errors={errors}
      handleDismissToast={handleDismissToast}
      handleInputChange={handleInputChange}
      handleToggle={handleToggle}
      handleSuccessModal={handleSuccessModal}
      intl={intl}
      natureOfSupplier={natureOfSupplier}
      onClickGoToLogin={onClickGoToLogin}
      onGoBack={onGoBack}
      options={options}
      onDeleteImage={handleImageDeletion}
      onImageUpload={handleImageUpload}
      showSuccessSignUp={showSuccessSignUp}
      socialMediaLinks={socialMediaLinks}
      validationError={validationError}
      website={website}
    />
  );
};

SignUpLastScreenComponent.propTypes = {
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpLastScreenComponent;
