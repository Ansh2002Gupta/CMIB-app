import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { SignUpContext } from "../../globalContext/signUp/signUpProvider";
import { setSignUpDetails } from "../../globalContext/signUp/signUpActions";
import { validateEmail } from "../../constants/CommonFunctions";
import { numRegex } from "../../constants/constants";

import SignUpThirdScreenUI from "./SignUpThirdScreenUI";

const SignUpThirdScreenComponent = ({ tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const initialContactDetails = signUpState.signUpDetail.contact_details || [];

  const [salutation, setSalutation] = useState(
    initialContactDetails[0]?.salutation || ""
  );
  const [name, setName] = useState(initialContactDetails[0]?.name || "");
  const [designation, setDesignation] = useState(
    initialContactDetails[0]?.designation || ""
  );
  const [mobileNo, setMobileNo] = useState(
    initialContactDetails[0]?.mobile_number || ""
  );
  const [emailId, setEmailId] = useState(initialContactDetails[0]?.email || "");

  const [errors, setErrors] = useState({
    name: "",
    salutation: "",
    designation: "",
    mobileNo: "",
    emailId: "",
  });

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
      newErrors.name =
        "Contact Person Name must be between 6 and 255 characters.";
      isValid = false;
    }

    if (designation.length < 6 || designation.length > 500) {
      newErrors.designation =
        "Designation must be between 6 and 500 characters.";
      isValid = false;
    }

    if (
      !numRegex.test(String(mobileNo)) ||
      mobileNo.length > 15 ||
      mobileNo.length < 7
    ) {
      newErrors.mobileNo =
        "Mobile number must be a combination of numbers and between 7 and 15 digits.";
      isValid = false;
    }

    if (validateEmail(emailId)) {
      newErrors.emailId = "Email ID must be valid.";
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

      if (
        existingContactDetails.some((detail) => detail.module === "ca-jobs")
      ) {
        const details = {
          name: name,
          email: emailId,
          salutation: salutation,
          mobile_number: mobileNo,
          designation: designation,
        };
        const caJobsIndex = existingContactDetails.findIndex(
          (detail) => detail.module === "ca-jobs"
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
    />
  );
};

export default SignUpThirdScreenComponent;
