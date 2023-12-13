import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpThirdScreenUI from "./SignUpThirdScreenUI";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { validateEmail } from "../../../constants/CommonFunctions";
import { numRegex } from "../../../constants/constants";

const SignUpThirdScreenComponent = ({ tabHandler, index, module }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const initialContactDetails = signUpState.signUpDetail.contact_details || [];

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
    case "ca-jobs":
      headerText = intl.formatMessage({ id: "label.for_ca_jobs" });
      break;
    case "newly-qualified-ca-placememt":
      headerText = intl.formatMessage({ id: "label.for_new_ca_placement" });
      break;
    case "overseas-placements":
      headerText = intl.formatMessage({ id: "label.for_overseas_placements" });
      break;
    case "career-ascents":
      headerText = intl.formatMessage({ id: "label.for_career_ascents" });
      break;
    case "women-placement":
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

    if (name.length < 6 || name.length > 255) {
      newErrors.name = intl.formatMessage({
        id: "label.contact_person_validation",
      });
      isValid = false;
    }

    if (designation.length < 6 || designation.length > 500) {
      newErrors.designation = intl.formatMessage({
        id: "label.designation_validation",
      });
      isValid = false;
    }

    if (
      !numRegex.test(String(mobileNo)) ||
      mobileNo.length > 15 ||
      mobileNo.length < 7
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

        signUpDispatch(setSignUpDetails(newContactDetails));
        tabHandler("next");
      }
    }
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
    />
  );
};

SignUpThirdScreenComponent.propTypes = {
  tabHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  module: PropTypes.string.isRequired,
};

export default SignUpThirdScreenComponent;
