import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpThirdScreenUI from "./SignUpThirdScreenUI";
import useFetch from "../../../hooks/useFetch";
import useValidateSignUp from "../../../services/apiServices/hooks/SignUp/useValidateSignUp";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { scrollToRef } from "../../../utils/util";
import { validateEmail } from "../../../utils/validation";
import {
  ADDRESS_MAX_LENGTH,
  FIELD_MAX_LENGTH,
  FIELD_MIN_LENGTH,
  NUMBER_MIN_LENGTH,
  NUMBER_MAX_LENGTH,
  numRegex,
} from "../../../constants/constants";
import { COUNTRY_CODE } from "../../../services/apiServices/apiEndPoint";

const SignUpThirdScreenComponent = ({ onClickGoToLogin, tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const { data } = useFetch({ url: COUNTRY_CODE });
  const initialContactDetails =
    signUpState?.signUpDetail?.contact_details || [];
  const {
    handleSignUpValidation,
    isLoading,
    validationError,
    setValidationError,
  } = useValidateSignUp();

  const [contactDetails, setContactDetails] = useState(
    initialContactDetails.map((contact) => ({
      countryCode: contact.mobile_country_code || "",
      designation: contact.designation || "",
      emailId: contact.email || "",
      mobileNo: contact.mobile_number || "",
      module: contact.module,
      name: contact.name || "",
      salutation: contact.salutation || "",
    }))
  );

  const [errors, setErrors] = useState(
    contactDetails.map(() => ({
      designation: "",
      emailId: "",
      mobileNo: "",
      name: "",
    }))
  );

  const nameRef = useRef(null);
  const designationRef = useRef(null);
  const emailRef = useRef(null);
  const mobilNoRef = useRef(null);

  const contactDetailRef = useRef(
    contactDetails.map(() => ({
      nameRef,
      designationRef,
      emailRef,
      mobilNoRef,
    }))
  );

  useEffect(() => {
    setContactDetails(
      initialContactDetails.map((contact) => ({
        countryCode: contact.mobile_country_code || "",
        designation: contact.designation || "",
        emailId: contact.email || "",
        mobileNo: contact.mobile_number || "",
        module: contact.module || "",
        name: contact.name || "",
        salutation: contact.salutation || "",
      }))
    );
    setErrors(
      initialContactDetails.map(() => ({
        designation: "",
        emailId: "",
        mobileNo: "",
        name: "",
      }))
    );
  }, [initialContactDetails]);

  const allFieldsFilled = () => {
    return contactDetails.every((detail) => {
      const requiredFields = [
        detail.countryCode,
        detail.salutation,
        detail.designation,
        detail.emailId,
        detail.mobileNo,
        detail.name,
      ];
      return requiredFields.every((field) => String(field).trim() !== "");
    });
  };

  const validateField = ({
    name,
    index,
    enteredValue,
    shouldScrollToError,
  }) => {
    const value = enteredValue || contactDetails[index][name];
    let error = "";
    let isValid = true;

    if (shouldScrollToError) {
      if (shouldScrollToError || name === "name") {
        if (
          value.trim().length < FIELD_MIN_LENGTH ||
          value.trim().length > FIELD_MAX_LENGTH
        ) {
          scrollToRef(contactDetailRef.current?.[index]?.nameRef);
          isValid = false;
        }
      }
      if (shouldScrollToError || name === "designation") {
        if (
          value.trim().length < FIELD_MIN_LENGTH ||
          value.trim().length > ADDRESS_MAX_LENGTH
        ) {
          if (isValid) {
            scrollToRef(contactDetailRef.current?.[index].designationRef);
          }
          isValid = false;
        }
      }
      if (shouldScrollToError || name === "mobileNo") {
        if (
          !numRegex.test(String(value)) ||
          value.trim().length < NUMBER_MIN_LENGTH ||
          value.trim().length > NUMBER_MAX_LENGTH
        ) {
          if (isValid) {
            scrollToRef(contactDetailRef.current?.[index].mobilNoRef);
          }
          isValid = false;
        }
      }
      if (shouldScrollToError || name === "emailId") {
        if (validateEmail(value)) {
          if (isValid) {
            scrollToRef(contactDetailRef.current?.[index].emailRef);
          }
          isValid = false;
        }
      }
    }
    switch (name) {
      case "name":
        if (
          value.trim().length < FIELD_MIN_LENGTH ||
          value.trim().length > FIELD_MAX_LENGTH
        ) {
          error = intl.formatMessage({
            id: "label.contact_person_validation",
          });
        }
        break;
      case "designation":
        if (
          value.trim().length < FIELD_MIN_LENGTH ||
          value.trim().length > ADDRESS_MAX_LENGTH
        ) {
          error = intl.formatMessage({
            id: "label.designation_validation",
          });
        }
        break;
      case "mobileNo":
        if (
          !numRegex.test(String(value)) ||
          value.trim().length < NUMBER_MIN_LENGTH ||
          value.trim().length > NUMBER_MAX_LENGTH
        ) {
          error = intl.formatMessage({
            id: "label.mobile_number_validation",
          });
        }
        break;
      case "emailId":
        if (validateEmail(value)) {
          error = intl.formatMessage({ id: "label.email_id_validation" });
        }
        break;
      default:
        error = "";
    }

    return error;
  };

  const handleBlur = (name, index) => {
    const fieldError = validateField({ name, index });

    let isDuplicate = false;

    if (name === "emailId" || name === "mobileNo") {
      isDuplicate = contactDetails.some((detail, i) => {
        return i !== index && detail[name] === contactDetails[index][name];
      });
    }
    const updatedErrors = [...errors];
    updatedErrors[index] = {
      ...updatedErrors[index],
      [name]:
        fieldError ||
        (isDuplicate
          ? intl.formatMessage({
              id:
                name === "emailId"
                  ? "label.duplicate_email_validation"
                  : "label.duplicate_mobileNo_validation",
            })
          : ""),
    };
    setErrors(updatedErrors);
  };

  const validateFields = () => {
    const newErrors = contactDetails.map((detail, index) => ({
      name: validateField({ name: "name", index, shouldScrollToError: true }),
      designation: validateField({
        name: "designation",
        index,
        shouldScrollToError: true,
      }),
      mobileNo: validateField({
        name: "mobileNo",
        index,
        shouldScrollToError: true,
      }),
      emailId: validateField({
        name: "emailId",
        index,
        shouldScrollToError: true,
      }),
    }));

    setErrors(newErrors);
    return newErrors.every((error) =>
      Object.values(error).every((fieldError) => fieldError === "")
    );
  };

  const onGoBack = () => {
    tabHandler("prev");
  };

  const handleDismissToast = () => {
    setValidationError("");
  };

  const onClickNext = () => {
    const isValid = validateFields();
    if (isValid) {
      const updatedContactDetails = contactDetails.map((detail) => ({
        module: detail.module,
        name: detail.name,
        email: detail.emailId,
        salutation: detail.salutation,
        mobile_number: detail.mobileNo,
        designation: detail.designation,
        mobile_country_code: detail.countryCode,
      }));

      const newContactDetails = {
        contact_details: updatedContactDetails,
      };

      handleSignUpValidation(newContactDetails, () => {
        signUpDispatch(setSignUpDetails(newContactDetails));
        tabHandler("next");
      });
    }
  };

  const handleInputChange = (value, name, index) => {
    const updatedDetails = [...contactDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    };
    setContactDetails(updatedDetails);
    if (
      errors[index][name] &&
      !validateField({ name, index, enteredValue: value })
    ) {
      const updatedErrors = [...errors];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [name]: "",
      };
      setErrors(updatedErrors);
    }
  };

  return (
    <SignUpThirdScreenUI
      {...{
        allFieldsFilled,
        contactDetails,
        contactDetailRef,
        countryCodeResult: data,
        errors,
        handleBlur,
        handleDismissToast,
        handleInputChange,
        intl,
        isLoading,
        onClickGoToLogin,
        onClickNext,
        onGoBack,
        validationError,
      }}
    />
  );
};

SignUpThirdScreenComponent.propTypes = {
  onClickGoToLogin: PropTypes.func.isRequired,
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpThirdScreenComponent;
