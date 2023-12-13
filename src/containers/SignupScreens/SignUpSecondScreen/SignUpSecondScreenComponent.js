import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpSecondScreenUI from "./SignUpSecondScreenUI";
import useGetStates from "../../../services/apiServices/hooks/useGetStates";
import useIndustryTypes from "../../../services/apiServices/hooks/useIndustryTypes";
import useValidateSignUp from "../../../services/apiServices/hooks/useValidateSignUp";
import { numRegex } from "../../../constants/constants";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { validateEmail } from "../../../constants/CommonFunctions";

const SignUpSecondScreenComponent = ({ tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const { handleSignUpValidation } = useValidateSignUp();
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

  useEffect(() => {
    getIndustryTypes();
    getStates();
  }, []);

  const [errors, setErrors] = useState({
    companyName: "",
    registrationNo: "",
    noOfPartners: "",
    address: "",
    emailId: "",
    telephoneNo: "",
    code: "",
  });

  const allFieldsFilled = () => {
    const requiredFields = Object.values(formData);
    return requiredFields.every((field) => String(field).trim() !== "");
  };

  const validateFields = () => {
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

    if (companyName.length < 6 || companyName.length > 255) {
      newErrors.companyName = intl.formatMessage({
        id: "label.company_name_validation",
      });
      isValid = false;
    }

    if (!numRegex.test(String(code)) || code.length < 2 || code.length > 8) {
      newErrors.code = intl.formatMessage({
        id: "label.country_code_validation",
      });
      isValid = false;
    }

    if (
      !numRegex.test(String(telephoneNo)) ||
      telephoneNo.length > 15 ||
      telephoneNo.length < 7
    ) {
      newErrors.telephoneNo = intl.formatMessage({
        id: "label.telephone_no_validation",
      });
      isValid = false;
    }

    if (validateEmail(emailId)) {
      newErrors.emailId = intl.formatMessage({
        id: "label.email_id_validation",
      });
      isValid = false;
    }

    if (
      !numRegex.test(String(registrationNo)) ||
      registrationNo.length !== 10
    ) {
      newErrors.registrationNo = intl.formatMessage({
        id: "label.registration_no_validation",
      });
      isValid = false;
    }

    if (address.length < 6 || address.length > 500) {
      newErrors.address = intl.formatMessage({
        id: "label.address_validation",
      });
      isValid = false;
    }

    if (!numRegex.test(String(noOfPartners))) {
      newErrors.noOfPartners = intl.formatMessage({
        id: "label.no_of_partners_validation",
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

      handleSignUpValidation(
        details,
        () => {
          signUpDispatch(setSignUpDetails(details));
          tabHandler("next");
        },
        (error) => {
          console.error("ERROR:", error);
        }
      );
    }
  };

  const handleInputChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <SignUpSecondScreenUI
      intl={intl}
      onGoBack={onGoBack}
      onClickNext={onClickNext}
      formData={formData}
      handleInputChange={handleInputChange}
      errors={errors}
      allFieldsFilled={allFieldsFilled}
      industryOptions={industryTypeResult}
      stateOptions={stateResult}
    />
  );
};

SignUpSecondScreenComponent.propTypes = {
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpSecondScreenComponent;
