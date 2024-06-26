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
  DEFAULT_INPUT_MAX_LENGTH,
  FIRM_OF_CHARTERED_ACCOUNTANTS,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
} from "../../../constants/constants";
import { scrollToRef } from "../../../utils/util";
import {
  deleteSignUpDetailKey,
  setSignUpDetails,
} from "../../../globalContext/signUp/signUpActions";
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
    const isFirm = formData.entity === FIRM_OF_CHARTERED_ACCOUNTANTS;

    const requiredFields = Object.entries(formData)
      .filter(
        ([key, value]) =>
          isFirm || (key !== "registrationNo" && key !== "noOfPartners")
      )
      .map(([, value]) => value);
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

    const { address, code, companyName, emailId, noOfPartners, telephoneNo } =
      formData;

    if (!field || field === "companyName") {
      const enteredCompanyName = value || companyName;
      if (
        enteredCompanyName &&
        enteredCompanyName.trim().length > DEFAULT_INPUT_MAX_LENGTH
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
      const enteredAddress = value || address;
      if (enteredAddress && enteredAddress.trim().length > ADDRESS_MAX_LENGTH) {
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

    let mandatoryDetails = {
      name: companyName,
      email: emailId,
      entity: entity,
      telephone_number: telephoneNo,
      address: address,
      std_country_code: code,
      industry_type_id: parseInt(currentIndustry),
      state_code: state,
    };

    if (entity === FIRM_OF_CHARTERED_ACCOUNTANTS) {
      mandatoryDetails = {
        ...mandatoryDetails,
        frn_number: registrationNo,
        number_of_partners: parseInt(noOfPartners, 10),
      };
    }
    signUpDispatch(setSignUpDetails(mandatoryDetails));
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

      let mandatoryDetails = {
        name: companyName,
        email: emailId,
        entity: entity,
        telephone_number: telephoneNo,
        address: address,
        std_country_code: code,
        industry_type_id: parseInt(currentIndustry),
        state_code: state,
      };

      if (entity === FIRM_OF_CHARTERED_ACCOUNTANTS) {
        mandatoryDetails = {
          ...mandatoryDetails,
          frn_number: registrationNo,
          number_of_partners: parseInt(noOfPartners, 10),
        };
      }

      handleSignUpValidation(mandatoryDetails, () => {
        signUpDispatch(setSignUpDetails(mandatoryDetails));
        tabHandler("next");
      });
    }
  };

  const handleInputChange = (value, name) => {
    if (name === "entity" && value !== FIRM_OF_CHARTERED_ACCOUNTANTS) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        registrationNo: "",
        noOfPartners: "",
      }));
      signUpDispatch(deleteSignUpDetailKey("frn_number"));
      signUpDispatch(deleteSignUpDetailKey("number_of_partners"));
      setErrors((prevErrors) => ({
        ...prevErrors,
        registrationNo: "",
        noOfPartners: "",
      }));
    } else {
      errors[name] && validateFields({ field: name, value });
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
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
