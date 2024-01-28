import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpSecondScreenUI from "./SignUpSecondScreenUI";
import useGetStates from "../../../services/apiServices/hooks/useGetStates";
import useIndustryTypes from "../../../services/apiServices/hooks/useIndustryTypes";
import useValidateSignUp from "../../../services/apiServices/hooks/SignUp/useValidateSignUp";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import {
  numRegex,
  ADDRESS_MAX_LENGTH,
  CODE_MAX_LENGTH,
  CODE_MIN_LENGTH,
  FIELD_MAX_LENGTH,
  FIELD_MIN_LENGTH,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  REGISTRATION_NO_LENGTH,
} from "../../../constants/constants";
import { scrollToRef } from "../../../utils/util";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { validateEmail } from "../../../utils/validation";

const SignUpSecondScreenComponent = ({ onClickGoToLogin, tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const {
    handleSignUpValidation,
    isLoading,
    setValidationError,
    validationError,
  } = useValidateSignUp();
  const {
    error: errorGettingIndustries,
    getIndustryTypes,
    industryTypeResult,
    isLoading: isGettingIndustries,
    isError: isErrorGettingIndustries,
  } = useIndustryTypes();
  const {
    error: errorGettingStates,
    getStates,
    stateResult,
    isLoading: isGettingStates,
    isError: isErrorGettingStates,
  } = useGetStates();
  const initialSignUpDetail = signUpState.signUpDetail;

  const [formData, setFormData] = useState({
    companyName: initialSignUpDetail.name || "",
    registrationNo: initialSignUpDetail.frn_number || "",
    noOfPartners: initialSignUpDetail.number_of_partners || "",
    address: initialSignUpDetail.address || "",
    emailId: initialSignUpDetail.email || "",
    telephoneNo: initialSignUpDetail.telephone_number || "",
    code: initialSignUpDetail.std_country_code || "",
    entity: initialSignUpDetail.entity || "",
    currentIndustry: initialSignUpDetail.industry_type_id || "",
    state: initialSignUpDetail.state_code || "",
  });

  const [errors, setErrors] = useState({
    companyName: "",
    registrationNo: "",
    noOfPartners: "",
    address: "",
    emailId: "",
    telephoneNo: "",
    code: "",
  });

  const companyNameRef = useRef(null);
  const firmRegistrationRef = useRef(null);
  const noOfPartnersRef = useRef(null);
  const addressRef = useRef(null);
  const emailIdRef = useRef(null);
  const telephoneNoRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    getStates();
    getIndustryTypes();
  }, []);

  const allFieldsFilled = () => {
    const requiredFields = Object.values(formData);
    return requiredFields.every((field) => String(field).trim() !== "");
  };

  const validateFields = ({ field, shouldSrollToError, value }) => {
    let isValid = true;
    let newErrors = {
      companyName: "",
      registrationNo: "",
      noOfPartners: "",
      address: "",
      emailId: "",
      telephoneNo: "",
      code: "",
    };

    const {
      companyName,
      registrationNo,
      noOfPartners,
      address,
      emailId,
      telephoneNo,
      code,
    } = formData;

    if (!field || field === "companyName") {
      const enteredCompanyName = value || companyName;
      if (
        enteredCompanyName &&
        (enteredCompanyName.trim().length < FIELD_MIN_LENGTH ||
          enteredCompanyName.trim().length > FIELD_MAX_LENGTH)
      ) {
        newErrors.companyName = intl.formatMessage({
          id: "label.company_name_validation",
        });
        if (shouldSrollToError) {
          scrollToRef(companyNameRef);
        }
        isValid = false;
      }
    }

    if (!field || field === "registrationNo") {
      const enteredRegistrationNo = value || registrationNo;
      if (
        enteredRegistrationNo &&
        (!numRegex.test(String(enteredRegistrationNo)) ||
          enteredRegistrationNo.length !== REGISTRATION_NO_LENGTH)
      ) {
        newErrors.registrationNo = intl.formatMessage({
          id: "label.registration_no_validation",
        });
        if (isValid && shouldSrollToError) {
          scrollToRef(firmRegistrationRef);
        }
        isValid = false;
      }
    }

    if (!field || field === "noOfPartners") {
      const enteredNoOfPartners = value || noOfPartners;
      if (enteredNoOfPartners && !numRegex.test(String(enteredNoOfPartners))) {
        newErrors.noOfPartners = intl.formatMessage({
          id: "label.no_of_partners_validation",
        });
        if (isValid && shouldSrollToError) {
          scrollToRef(noOfPartnersRef);
        }
        isValid = false;
      }
    }

    if (!field || field === "address") {
      const enteredaddress = value || address;
      if (
        enteredaddress &&
        (enteredaddress.trim().length < FIELD_MIN_LENGTH ||
          enteredaddress.trim().length > ADDRESS_MAX_LENGTH)
      ) {
        newErrors.address = intl.formatMessage({
          id: "label.address_validation",
        });
        if (isValid && shouldSrollToError) {
          scrollToRef(addressRef);
        }
        isValid = false;
      }
    }

    if (!field || field === "emailId") {
      const enteredEmailId = value || emailId;
      if (enteredEmailId && validateEmail(enteredEmailId)) {
        newErrors.emailId = intl.formatMessage({
          id: "label.email_id_validation",
        });
        if (isValid && shouldSrollToError) {
          scrollToRef(emailIdRef);
        }
        isValid = false;
      }
    }

    if (!field || field === "code") {
      const enteredCode = value || code;
      if (
        enteredCode &&
        (!numRegex.test(String(enteredCode)) ||
          enteredCode.length < CODE_MIN_LENGTH ||
          enteredCode.length > CODE_MAX_LENGTH)
      ) {
        newErrors.code = intl.formatMessage({
          id: "label.country_code_validation",
        });
        if (isValid && shouldSrollToError) {
          scrollToRef(codeRef);
        }
        isValid = false;
      }
    }

    if (!field || field === "telephoneNo") {
      const enteredTelephoneNo = value || telephoneNo;
      if (
        enteredTelephoneNo &&
        (!numRegex.test(String(enteredTelephoneNo)) ||
          enteredTelephoneNo.length > NUMBER_MAX_LENGTH ||
          enteredTelephoneNo.length < NUMBER_MIN_LENGTH)
      ) {
        newErrors.telephoneNo = intl.formatMessage({
          id: "label.telephone_no_validation",
        });
        if (isValid && shouldSrollToError) {
          scrollToRef(telephoneNoRef);
        }
        isValid = false;
      }
    }

    if (field && newErrors[field] !== undefined) {
      setErrors({
        ...errors,
        [field]: newErrors[field],
      });
    } else {
      setErrors(newErrors);
    }

    return isValid;
  };

  const handleDismissToast = () => {
    setValidationError("");
  };

  const onGoBack = () => {
    tabHandler("prev");
  };

  const onClickNext = (event) => {
    event?.preventDefault();
    if (validateFields({ shouldSrollToError: true })) {
      const {
        companyName,
        emailId,
        entity,
        registrationNo,
        noOfPartners,
        telephoneNo,
        address,
        code,
        currentIndustry,
        state,
      } = formData;

      const details = {
        name: companyName,
        email: emailId,
        entity: entity,
        frn_number: registrationNo,
        number_of_partners: parseInt(noOfPartners, 10),
        telephone_number: telephoneNo,
        address: address,
        std_country_code: code,
        industry_type_id: parseInt(currentIndustry),
        state_code: state,
      };

      handleSignUpValidation(details, () => {
        signUpDispatch(setSignUpDetails(details));
        tabHandler("next");
      });
    }
  };

  const handleInputChange = (value, name) => {
    errors[name] && validateFields({ field: name, value });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (name) => {
    validateFields({ field: name });
  };

  const getErrorDetails = () => {
    if (isErrorGettingIndustries && isErrorGettingStates) {
      let errorMessage = "";
      if (
        errorGettingIndustries === GENERIC_GET_API_FAILED_ERROR_MESSAGE &&
        errorGettingStates === GENERIC_GET_API_FAILED_ERROR_MESSAGE
      ) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorGettingIndustries} , ${errorGettingStates}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          getStates();
          getIndustryTypes();
        },
      };
    }
    if (isErrorGettingIndustries)
      return {
        errorMessage: errorGettingIndustries,
        onRetry: getIndustryTypes,
      };
    if (isErrorGettingStates)
      return {
        errorMessage: errorGettingStates,
        onRetry: getStates,
      };
    return {
      errorMessage: "",
      onRetry: () => {},
    };
  };

  return (
    <SignUpSecondScreenUI
      {...{
        addressRef,
        allFieldsFilled,
        codeRef,
        companyNameRef,
        emailIdRef,
        errors,
        firmRegistrationRef,
        formData,
        getErrorDetails,
        handleBlur,
        handleDismissToast,
        handleInputChange,
        industryOptions: industryTypeResult,
        intl,
        isErrorGettingStates,
        isErrorGettingIndustries,
        isGettingIndustries,
        isLoading: isLoading,
        isGettingStates,
        noOfPartnersRef,
        onGoBack,
        onClickGoToLogin,
        onClickNext,
        stateOptions: stateResult,
        telephoneNoRef,
        validationError,
      }}
    />
  );
};

SignUpSecondScreenComponent.propTypes = {
  onClickGoToLogin: PropTypes.func.isRequired,
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpSecondScreenComponent;
