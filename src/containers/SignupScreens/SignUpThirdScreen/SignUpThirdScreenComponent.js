import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpThirdScreenUI from "./SignUpThirdScreenUI";
import useFetch from "../../../hooks/useFetch";
import useGetErrorRefs from "./controllers/useGetErrorRefs";
import useValidateSignUp from "../../../services/apiServices/hooks/SignUp/useValidateSignUp";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { scrollToRef } from "../../../utils/util";
import { validateEmail } from "../../../utils/validation";
import {
  ADDRESS_MAX_LENGTH,
  DEFAULT_INPUT_MAX_LENGTH,
  MOBILE_NUMBER_MIN_LENGTH,
  MOBILE_NUMBER_MAX_LENGTH,
  numRegex,
  MODULE_OPTIONS,
} from "../../../constants/constants";
import { COUNTRY_CODE } from "../../../services/apiServices/apiEndPoint";

const SignUpThirdScreenComponent = ({ onClickGoToLogin, tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const {
    data,
    isLoading: isGettingCountryCodes,
    isError: isErrorCountryCodes,
    error: errorCountryCodes,
    fetchData,
  } = useFetch({ url: COUNTRY_CODE });
  const {
    handleSignUpValidation,
    isLoading,
    validationError,
    setValidationError,
  } = useValidateSignUp();

  const [contactDetails, setContactDetails] = useState(
    signUpState?.signUpDetail?.contact_details?.map((contact) => ({
      countryCode: contact?.mobile_country_code || "",
      designation: contact?.designation || "",
      emailId: contact?.email || "",
      mobileNo: contact?.mobile_number || "",
      modules: contact?.modules,
      name: contact?.name || "",
      salutation: contact?.salutation || "",
    }))
  );

  const [errors, setErrors] = useState(
    contactDetails?.map(() => ({
      designation: "",
      emailId: "",
      mobileNo: "",
      name: "",
    }))
  );

  const [moduleList, setModuleList] = useState();

  const { getAppropriateRef } = useGetErrorRefs();

  useEffect(() => {
    setContactDetails(
      signUpState?.signUpDetail?.contact_details?.map((contact) => ({
        countryCode: contact?.mobile_country_code || "",
        designation: contact?.designation || "",
        emailId: contact?.email || "",
        mobileNo: contact?.mobile_number || "",
        modules: contact?.modules || [],
        name: contact?.name || "",
        salutation: contact?.salutation || "",
      }))
    );
    setErrors(
      signUpState?.signUpDetail?.contact_details?.map(() => ({
        designation: "",
        emailId: "",
        mobileNo: "",
        name: "",
      }))
    );

    setModuleList(
      moduleListArrayToArrayOfObject(signUpState?.signUpDetail?.module_list)
    );
  }, [signUpState?.signUpDetail?.contact_details]);

  const moduleListArrayToArrayOfObject = (arr) => {
    const newList = arr
      .map((moduleID) => {
        const moduleOption = MODULE_OPTIONS.find(
          (option) => option.id === moduleID
        );
        if (moduleOption) {
          return {
            name: intl.formatMessage({ id: moduleOption.messageId }),
            value: moduleOption.id,
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);

    return newList;
  };

  const allFieldsFilled = () => {
    return contactDetails?.every((detail) => {
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

  const constructUpdatedContactDetails = (contactDetails) => {
    return contactDetails?.map((detail) => ({
      module: detail.module,
      name: detail.name,
      email: detail.emailId,
      salutation: detail.salutation,
      mobile_number: detail.mobileNo,
      designation: detail.designation,
      mobile_country_code: detail.countryCode,
    }));
  };

  const validateField = ({ name, index, enteredValue }) => {
    const value = enteredValue || contactDetails[index][name];
    let error = "";
    switch (name) {
      case "name":
        if (value && value.trim().length > DEFAULT_INPUT_MAX_LENGTH) {
          error = intl.formatMessage({
            id: "label.contact_person_validation",
          });
        }
        break;
      case "designation":
        if (value && value.trim().length > ADDRESS_MAX_LENGTH) {
          error = intl.formatMessage({
            id: "label.designation_validation",
          });
        }
        break;
      case "mobileNo":
        if (
          value &&
          (!numRegex.test(String(value)) ||
            value.trim().length < MOBILE_NUMBER_MIN_LENGTH ||
            value.trim().length > MOBILE_NUMBER_MAX_LENGTH)
        ) {
          error = intl.formatMessage({
            id: "label.mobile_number_validation",
          });
        }
        break;
      case "emailId":
        if (value && validateEmail(value)) {
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
    const updatedErrors = [...errors];
    updatedErrors[index] = {
      ...updatedErrors[index],
      [name]: fieldError,
    };
    setErrors(updatedErrors);
  };

  const validateFields = () => {
    const newErrors = contactDetails?.map((detail, index) => ({
      name: validateField({ name: "name", index }),
      designation: validateField({
        name: "designation",
        index,
      }),
      mobileNo: validateField({
        name: "mobileNo",
        index,
      }),
      emailId: validateField({
        name: "emailId",
        index,
      }),
    }));

    setErrors(newErrors);
    return newErrors.every((error) =>
      Object.values(error).every((fieldError) => fieldError === "")
    );
  };

  const onGoBack = () => {
    const updatedContactDetails =
      constructUpdatedContactDetails(contactDetails);
    signUpDispatch(
      setSignUpDetails({ contact_details: updatedContactDetails })
    );
    tabHandler("prev");
  };

  const handleDismissToast = () => {
    setValidationError("");
  };

  const onClickNext = () => {
    const isValid = validateFields();
    if (isValid) {
      const newContactDetails = {
        contact_details: constructUpdatedContactDetails(contactDetails),
      };

      const payloadData = {
        contact_details: newContactDetails.contact_details.map((item) => {
          return {
            ...item,
            mobile_country_code: item.mobile_country_code?.split(" ")?.[0],
          };
        }),
      };
      handleSignUpValidation(payloadData, () => {
        signUpDispatch(setSignUpDetails(newContactDetails));
        tabHandler("next");
      });
    } else {
      for (let i = 0; i < contactDetails.length; i++) {
        if (validateField({ name: "name", index: i })) {
          scrollToRef(getAppropriateRef(contactDetails[i].module, "name"));
          return;
        }
        if (
          validateField({
            name: "designation",
            index: i,
          })
        ) {
          scrollToRef(
            getAppropriateRef(contactDetails[i].module, "designation")
          );
          return;
        }
        if (
          validateField({
            name: "mobileNo",
            index: i,
          })
        ) {
          scrollToRef(getAppropriateRef(contactDetails[i].module, "mobileNo"));
          return;
        }
        if (
          validateField({
            name: "emailId",
            index: i,
          })
        ) {
          scrollToRef(getAppropriateRef(contactDetails[i].module, "emailId"));
          return;
        }
      }
    }
  };

  const handleInputChange = (value, name, index) => {
    const updatedDetails = [...contactDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    };
    setContactDetails(updatedDetails);
    const newList = moduleList.filter((item) => !value.includes(item.value));
    setModuleList(newList);
  };

  const onDeleteSelectedItem = (list, index) => {
    const updatedDetails = [...contactDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      modules: list,
    };
    setContactDetails(updatedDetails);
    const newdata = signUpState?.signUpDetail?.module_list.filter(
      (item) => !list.includes(item)
    );
    setModuleList(moduleListArrayToArrayOfObject(newdata));
  };

  const getErrorDetails = () => {
    if (isErrorCountryCodes)
      return {
        errorMessage: errorCountryCodes,
        onRetry: fetchData,
      };
    return {
      errorMessage: "",
      onRetry: () => {},
    };
  };

  const handleAddContactPerson = () => {
    setContactDetails([...contactDetails, {}]);
  };

  const handleRemoveContactPerson = (index) => {
    const updatedContactDetails = contactDetails.filter((_, i) => i !== index);
    setContactDetails(updatedContactDetails);
  };

  return (
    <SignUpThirdScreenUI
      {...{
        allFieldsFilled,
        contactDetails,
        countryCodeResult: data,
        errors,
        getAppropriateRef,
        getErrorDetails,
        handleAddContactPerson,
        handleBlur,
        handleDismissToast,
        handleInputChange,
        handleRemoveContactPerson,
        intl,
        isErrorCountryCodes,
        isGettingCountryCodes,
        isLoading,
        onClickGoToLogin,
        onClickNext,
        onGoBack,
        onDeleteSelectedItem,
        moduleList,
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
