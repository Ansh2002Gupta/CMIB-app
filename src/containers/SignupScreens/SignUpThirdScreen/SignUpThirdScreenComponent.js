import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpThirdScreenUI from "./SignUpThirdScreenUI";
import useValidateSignUp from "../../../services/apiServices/hooks/SignUp/useValidateSignUp";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { validateEmail } from "../../../constants/commonFunctions";
import {
  numRegex,
  ADDRESS_MAX_LENGTH,
  CAREER_ASCENTS,
  CA_JOBS,
  FIELD_MAX_LENGTH,
  FIELD_MIN_LENGTH,
  NEWLY_QUALIFIED,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  OVERSEAS_PLACEMENTS,
  WOMENT_PLACEMENT,
} from "../../../constants/constants";

const SignUpThirdScreenComponent = ({ tabHandler, index, module }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const initialContactDetails =
    signUpState?.signUpDetail?.contact_details || [];
  const { handleSignUpValidation } = useValidateSignUp();

  const [validationError, setValidationError] = useState("");
  const [salutation, setSalutation] = useState(
    initialContactDetails[index]?.salutation || ""
  );
  const [name, setName] = useState(initialContactDetails[index]?.name || "");
  const [designation, setDesignation] = useState(
    initialContactDetails[index]?.designation || ""
  );
  const [mobileNo, setMobileNo] = useState(
    initialContactDetails[index]?.mobile_number || ""
  );
  const [emailId, setEmailId] = useState(
    initialContactDetails[index]?.email || ""
  );

  const [errors, setErrors] = useState({
    name: "",
    salutation: "",
    designation: "",
    mobileNo: "",
    emailId: "",
  });

  useEffect(() => {
    setSalutation(initialContactDetails[index].salutation || "");
    setName(initialContactDetails[index].name || "");
    setDesignation(initialContactDetails[index].designation || "");
    setMobileNo(initialContactDetails[index].mobile_number || "");
    setEmailId(initialContactDetails[index].email || "");

    setErrors({
      name: "",
      salutation: "",
      designation: "",
      mobileNo: "",
      emailId: "",
    });
  }, [index, module, initialContactDetails]);

  let headerText = "";
  switch (module) {
    case CA_JOBS:
      headerText = intl.formatMessage({ id: "label.for_ca_jobs" });
      break;
    case NEWLY_QUALIFIED:
      headerText = intl.formatMessage({ id: "label.for_new_ca_placement" });
      break;
    case OVERSEAS_PLACEMENTS:
      headerText = intl.formatMessage({ id: "label.for_overseas_placements" });
      break;
    case CAREER_ASCENTS:
      headerText = intl.formatMessage({ id: "label.for_career_ascents" });
      break;
    case WOMENT_PLACEMENT:
      headerText = intl.formatMessage({ id: "label.for_women_placements" });
      break;
    default:
      headerText = intl.formatMessage({ id: "label.for_ca_jobs" });
      break;
  }

  const allFieldsFilled = () => {
    const requiredFields = [name, salutation, designation, mobileNo, emailId];
    return requiredFields.every((field) => String(field).trim() !== "");
  };

  const validateFields = () => {
    let isValid = true;
    let newErrors = {
      name: "",
      salutation: "",
      designation: "",
      mobileNo: "",
      emailId: "",
    };

    if (name.length < FIELD_MIN_LENGTH || name.length > FIELD_MAX_LENGTH) {
      newErrors.name = intl.formatMessage({
        id: "label.contact_person_validation",
      });
      isValid = false;
    }

    if (
      designation.length < FIELD_MIN_LENGTH ||
      designation.length > ADDRESS_MAX_LENGTH
    ) {
      newErrors.designation = intl.formatMessage({
        id: "label.designation_validation",
      });
      isValid = false;
    }

    if (
      !numRegex.test(String(mobileNo)) ||
      mobileNo.length > NUMBER_MAX_LENGTH ||
      mobileNo.length < NUMBER_MIN_LENGTH
    ) {
      newErrors.mobileNo = intl.formatMessage({
        id: "label.mobile_number_validation",
      });
      isValid = false;
    }

    if (validateEmail(emailId)) {
      newErrors.emailId = intl.formatMessage({
        id: "label.email_id_validation",
      });
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onGoBack = () => {
    tabHandler("prev");
  };

  const onClickNext = () => {
    if (validateFields()) {
      const existingContactDetails =
        signUpState.signUpDetail.contact_details || [];

      if (existingContactDetails.some((detail) => detail.module === module)) {
        const details = {
          name: name,
          email: emailId,
          salutation: salutation,
          mobile_number: mobileNo,
          designation: designation,
          mobile_country_code: "+91",
        };
        const caJobsIndex = existingContactDetails.findIndex(
          (detail) => detail.module === module
        );
        if (caJobsIndex !== -1) {
          existingContactDetails[caJobsIndex] = {
            ...existingContactDetails[caJobsIndex],
            ...details,
          };
        }

        const newContactDetails = {
          contact_details: [...existingContactDetails],
        };

        handleSignUpValidation(
          { newContactDetails },
          () => {
            signUpDispatch(setSignUpDetails(newContactDetails));
            tabHandler("next");
          },
          (error) => {
            setValidationError(error);
          }
        );
      }
    }
  };

  const handleDismissToast = () => {
    setValidationError("");
  };

  const handleInputChange = (value, name) => {
    switch (name) {
      case "salutation":
        setSalutation(value);
        break;
      case "name":
        setName(value);
        break;
      case "designation":
        setDesignation(value);
        break;
      case "email":
        setEmailId(value);
        break;
      case "mobileNo":
        setMobileNo(value);
        break;
      default:
        break;
    }
  };

  return (
    <SignUpThirdScreenUI
      intl={intl}
      onGoBack={onGoBack}
      onClickNext={onClickNext}
      handleInputChange={handleInputChange}
      salutation={salutation}
      mobileNo={mobileNo}
      emailId={emailId}
      name={name}
      designation={designation}
      allFieldsFilled={allFieldsFilled}
      errors={errors}
      headerText={headerText}
      validationError={validationError}
      handleDismissToast={handleDismissToast}
    />
  );
};

SignUpThirdScreenComponent.propTypes = {
  tabHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  module: PropTypes.string.isRequired,
};

export default SignUpThirdScreenComponent;
