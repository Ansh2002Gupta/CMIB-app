import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import {
  setSignUpDetails,
  resetSignUpDetails,
} from "../../../globalContext/signUp/signUpActions";
import SignUpLastScreenUI from "./SignUpLastScreenUI";
import { urlRegex } from "../../../constants/constants";

const SignUpLastScreenComponent = () => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const initialDetails = signUpState.signUpDetail || [];
  const [showSuccessSignUp, setShowSuccessSignUp] = useState(false);
  const [facebookUrl, setFacebookUrl] = useState(
    initialDetails.social_media_link?.facebook || ""
  );
  const [linkedInUrl, setLinkedInUrl] = useState(
    initialDetails.social_media_link?.linkedIn || ""
  );
  const [twitterUrl, setTwitterUrl] = useState(
    initialDetails.social_media_link?.twitter || ""
  );
  const [youtubeUrl, setYoutubeUrl] = useState(
    initialDetails.social_media_link?.youtube || ""
  );
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

  const [options, setOptions] = useState([
    {
      title: intl.formatMessage({ id: "label.email_from_cpaib" }),
      isSelected: false,
      id: 1,
    },
    {
      title: intl.formatMessage({ id: "label.campus" }),
      isSelected: false,
      id: 2,
    },
    {
      title: intl.formatMessage({ id: "label.programme_brouchers" }),
      isSelected: false,
      id: 3,
    },
    {
      title: intl.formatMessage({ id: "label.based_on_prev_participation" }),
      isSelected: false,
      id: 4,
    },
    {
      title: intl.formatMessage({ id: "label.telephonic_call_from_icai" }),
      isSelected: false,
      id: 5,
    },
    {
      title: intl.formatMessage({ id: "label.advertisement_in_ca_journal" }),
      isSelected: false,
      id: 6,
    },
  ]);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    facebookUrl: "",
    linkedInUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
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
      facebookUrl: "",
      twitterUrl: "",
      linkedInUrl: "",
      youtubeUrl: "",
      companyDetails: "",
      website: "",
    };

    if (facebookUrl && !urlRegex.test(String(facebookUrl))) {
      newErrors.facebookUrl = "Please enter a valid URL.";
      isValid = false;
    }

    if (twitterUrl && !urlRegex.test(String(twitterUrl))) {
      newErrors.twitterUrl = "Please enter a valid URL.";
      isValid = false;
    }

    if (linkedInUrl && !urlRegex.test(String(linkedInUrl))) {
      newErrors.linkedInUrl = "Please enter a valid URL.";
      isValid = false;
    }

    if (youtubeUrl && !urlRegex.test(String(youtubeUrl))) {
      newErrors.youtubeUrl = "Please enter a valid URL.";
      isValid = false;
    }
    if (companyDetails.length < 6 || companyDetails.length > 1000) {
      newErrors.designation =
        "Designation must be between 6 and 500 characters.";
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
    switch (name) {
      case "facebookUrl":
        setFacebookUrl(value);
        break;
      case "linkedInUrl":
        setLinkedInUrl(value);
        break;
      case "twitterUrl":
        setTwitterUrl(value);
        break;
      case "youtubeUrl":
        setYoutubeUrl(value);
        break;
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
  };

  const handleSuccessModal = (value) => {
    if (value) {
      if (validateFields()) {
        const details = {
          social_media_link: {
            linkedIn: linkedInUrl,
            facebook: facebookUrl,
            twitter: twitterUrl,
            youtube: youtubeUrl,
          },
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

  console.log(signUpState);

  const onClickGoToLogin = () => {
    handleSuccessModal(false);
    signUpDispatch(resetSignUpDetails());
    navigate("/");
  };

  const onGoBack = () => {
    navigate("/signupThirdScreen");
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
      facebookUrl={facebookUrl}
      linkedInUrl={linkedInUrl}
      twitterUrl={twitterUrl}
      youtubeUrl={youtubeUrl}
      companyDetails={companyDetails}
      website={website}
      errors={errors}
      allFieldsFilled={allFieldsFilled}
    />
  );
};

export default SignUpLastScreenComponent;
