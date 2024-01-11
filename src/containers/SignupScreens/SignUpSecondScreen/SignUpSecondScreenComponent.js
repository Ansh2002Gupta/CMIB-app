import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpSecondScreenUI from "./SignUpSecondScreenUI";
import useGetStates from "../../../services/apiServices/hooks/useGetStates";
import useIndustryTypes from "../../../services/apiServices/hooks/useIndustryTypes";
import useValidateSignUp from "../../../services/apiServices/hooks/SignUp/useValidateSignUp";
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
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { validateEmail } from "../../../constants/commonFunctions";

const SignUpSecondScreenComponent = ({ onClickGoToLogin, tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const {
    handleSignUpValidation,
    isLoading,
    setValidationError,
    validationError,
  } = useValidateSignUp();
  const { getIndustryTypes, industryTypeResult } = useIndustryTypes();
  const { getStates, stateResult } = useGetStates();
  const initialSignUpDetail = signUpState.signUpDetail;

  const [formData, setFormData] = useState({
    companyName: initialSignUpDetail.name || "",
    registrationNo: initialSignUpDetail.frn_number || "",
    noOfPartners: initialSignUpDetail.number_of_partner || "",
    address: initialSignUpDetail.address || "",
    emailId: initialSignUpDetail.email || "",
    telephoneNo: initialSignUpDetail.telephone_number || "",
    code: initialSignUpDetail.std_country_code || "",
    entity: initialSignUpDetail.entity || "",
    currentIndustry: initialSignUpDetail.industry_type || "",
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

  useEffect(() => {
    getIndustryTypes();
    getStates();
  }, []);

  const allFieldsFilled = () => {
    const requiredFields = Object.values(formData);
    return requiredFields.every((field) => String(field).trim() !== "");
  };

  const validateFields = (field) => {
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
      if (
        companyName.length < FIELD_MIN_LENGTH ||
        companyName.length > FIELD_MAX_LENGTH
      ) {
        newErrors.companyName = intl.formatMessage({
          id: "label.company_name_validation",
        });
        isValid = false;
      }
    }

    if (!field || field === "code") {
      if (
        !numRegex.test(String(code)) ||
        code.length < CODE_MIN_LENGTH ||
        code.length > CODE_MAX_LENGTH
      ) {
        newErrors.code = intl.formatMessage({
          id: "label.country_code_validation",
        });
        isValid = false;
      }
    }

    if (!field || field === "telephoneNo") {
      if (
        !numRegex.test(String(telephoneNo)) ||
        telephoneNo.length > NUMBER_MAX_LENGTH ||
        telephoneNo.length < NUMBER_MIN_LENGTH
      ) {
        newErrors.telephoneNo = intl.formatMessage({
          id: "label.telephone_no_validation",
        });
        isValid = false;
      }
    }

    if (!field || field === "emailId") {
      if (validateEmail(emailId)) {
        newErrors.emailId = intl.formatMessage({
          id: "label.email_id_validation",
        });
        isValid = false;
      }
    }

    if (!field || field === "registrationNo") {
      if (
        !numRegex.test(String(registrationNo)) ||
        registrationNo.length !== REGISTRATION_NO_LENGTH
      ) {
        newErrors.registrationNo = intl.formatMessage({
          id: "label.registration_no_validation",
        });
        isValid = false;
      }
    }

    if (!field || field === "address") {
      if (
        address.length < FIELD_MIN_LENGTH ||
        address.length > ADDRESS_MAX_LENGTH
      ) {
        newErrors.address = intl.formatMessage({
          id: "label.address_validation",
        });
        isValid = false;
      }
    }

    if (!field || field === "noOfPartners") {
      if (!numRegex.test(String(noOfPartners))) {
        newErrors.noOfPartners = intl.formatMessage({
          id: "label.no_of_partners_validation",
        });
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
    if (validateFields()) {
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
        number_of_partner: parseInt(noOfPartners, 10),
        telephone_number: telephoneNo,
        address: address,
        std_country_code: code,
        industry_type: currentIndustry,
        state_code: state,
      };

      handleSignUpValidation(details, () => {
        signUpDispatch(setSignUpDetails(details));
        tabHandler("next");
      });
    }
  };

  const handleInputChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (name) => {
    validateFields(name);
  };

  return (
    <SignUpSecondScreenUI
      {...{
        allFieldsFilled,
        errors,
        formData,
        handleBlur,
        handleDismissToast,
        handleInputChange,
        industryOptions: industryTypeResult,
        intl,
        isLoading: isLoading,
        onGoBack,
        onClickGoToLogin,
        onClickNext,
        stateOptions: stateResult,
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
