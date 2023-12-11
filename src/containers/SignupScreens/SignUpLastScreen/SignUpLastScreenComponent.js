import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";

import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import {
  setSignUpDetails,
  resetSignUpDetails,
} from "../../../globalContext/signUp/signUpActions";
import SignUpLastScreenUI from "./SignUpLastScreenUI";
import { INTEREST_OPTIONS, urlRegex } from "../../../constants/constants";

const SignUpLastScreenComponent = ({ tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const initialDetails = signUpState.signUpDetail || [];
  const [showSuccessSignUp, setShowSuccessSignUp] = useState(false);

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
  const [companyType, setCompanyType] = useState(
    initialDetails.company_type || ""
  );

  const [options, setOptions] = useState(
    INTEREST_OPTIONS.map((option) => ({
      ...option,
      title: intl.formatMessage({ id: option.messageId }),
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
        newErrors.socialMediaLinks[key] = "Please enter a valid URL.";
        isValid = false;
      }
    });

    if (companyDetails.length < 6 || companyDetails.length > 1000) {
      newErrors.companyDetails =
        "Company details must be between 6 and 1000 characters.";
      isValid = false;
    }
    if (!urlRegex.test(String(website))) {
      newErrors.website = "Please enter a valid URL.";
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

  const handleSuccessModal = (value) => {
    if (value) {
      if (validateFields()) {
        const details = {
          social_media_link: socialMediaLinks,
          website: website,
          nature_of_supplier: natureOfSupplier,
          type: companyType,
          company_details: companyDetails,
        };
        signUpDispatch(setSignUpDetails(details));
        setShowSuccessSignUp(true);
      }
    } else {
      setShowSuccessSignUp(false);
    }
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
      intl={intl}
      onClickGoToLogin={onClickGoToLogin}
      onGoBack={onGoBack}
      options={options}
      handleToggle={handleToggle}
      handleSuccessModal={handleSuccessModal}
      showSuccessSignUp={showSuccessSignUp}
      handleInputChange={handleInputChange}
      socialMediaLinks={socialMediaLinks}
      companyDetails={companyDetails}
      website={website}
      errors={errors}
      allFieldsFilled={allFieldsFilled}
    />
  );
};

SignUpLastScreenComponent.propTypes = {
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpLastScreenComponent;
