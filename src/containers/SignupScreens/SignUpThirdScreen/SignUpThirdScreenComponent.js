import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpThirdScreenUI from "./SignUpThirdScreenUI";
import useFetch from "../../../hooks/useFetch";
import useGetErrorRefs from "./controllers/useGetErrorRefs";
import useValidateSignUp from "../../../services/apiServices/hooks/SignUp/useValidateSignUp";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import {
  setSignUpDetails,
  setModulesList,
} from "../../../globalContext/signUp/signUpActions";
import { scrollToRef } from "../../../utils/util";
import { validateEmail } from "../../../utils/validation";
import {
  ADDRESS_MAX_LENGTH,
  DEFAULT_INPUT_MAX_LENGTH,
  MOBILE_NUMBER_MIN_LENGTH,
  MOBILE_NUMBER_MAX_LENGTH,
  MODULE_OPTIONS,
  numRegex,
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
      modules: contact?.modules || [],
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

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

    const currentModulesList = signUpState?.modulesList;
    const newModulesListArray = signUpState?.signUpDetail?.module_list;

    if (
      !currentModulesList ||
      currentModulesList.length !== newModulesListArray?.length
    ) {
      signUpDispatch(
        setModulesList(
          moduleListArrayToArrayOfObject(signUpState?.signUpDetail?.module_list)
        )
      );
    }
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
            selectedIndex: null,
            isSelected: false,
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
        detail.modules,
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
      modules: detail?.modules,
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

  const isEmailUnique = (email, index) => {
    return contactDetails.every((detail, i) => {
      if (i === index) return true;
      return detail.emailId !== email;
    });
  };

  const isMobileNoUnique = (mobileNo, index) => {
    return contactDetails.every((detail, i) => {
      if (i === index) return true;
      return detail.mobileNo !== mobileNo;
    });
  };

  const validateUniqueFields = () => {
    const uniqueEmails = new Set();
    const uniqueMobileNumbers = new Set();

    const emailErrors = [];
    const mobileNoErrors = [];

    contactDetails.forEach((detail, index) => {
      if (!isEmailUnique(detail.emailId, index)) {
        emailErrors.push(index);
      } else {
        uniqueEmails.add(detail.emailId);
      }

      if (!isMobileNoUnique(detail.mobileNo, index)) {
        mobileNoErrors.push(index);
      } else {
        uniqueMobileNumbers.add(detail.mobileNo);
      }
    });

    const newErrors = errors.map((error, index) => ({
      ...error,
      emailId: emailErrors.includes(index)
        ? intl.formatMessage({ id: "label.duplicate_email_validation" })
        : "",
      mobileNo: mobileNoErrors.includes(index)
        ? intl.formatMessage({ id: "label.duplicate_mobileNo_validation" })
        : "",
    }));

    setErrors(newErrors);

    return emailErrors.length === 0 && mobileNoErrors.length === 0;
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
    signUpDispatch(setSignUpDetails(updatedContactDetails));
    tabHandler("prev");
  };

  const handleDismissToast = () => {
    setValidationError("");
  };

  const getUnselectedModules = (list) => {
    const unSelectedModules = list
      .filter((module) => !module.isSelected)
      .map((module) => module.name);
    return unSelectedModules;
  };

  const unselectedModules = getUnselectedModules(signUpState?.modulesList);

  const handleClickNext = () => {
    const isValid = validateFields() && validateUniqueFields();
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

  const onClickNext = () => {
    if (!!unselectedModules.length) {
      setShowConfirmationModal(true);
    } else {
      handleClickNext();
    }
  };

  const handleInputChange = (value, name, index) => {
    validateUniqueFields();
    const updatedDetails = [...contactDetails];
    if (name === "modules") {
      const existingModules = updatedDetails?.[index]?.[name] || [];

      if (existingModules.includes(value)) {
        // Remove the value if it already exists
        updatedDetails[index] = {
          ...updatedDetails[index],
          [name]: existingModules.filter((item) => item !== value),
        };
      } else {
        // Append the value if it does not exist
        updatedDetails[index] = {
          ...updatedDetails[index],
          [name]: [...existingModules, value],
        };
      }
      setContactDetails(updatedDetails);
      const newList = signUpState?.modulesList.map((item) => {
        if (value.includes(item.value)) {
          if (item.selectedIndex === null) {
            item.selectedIndex = index;
            item.isSelected = true;
          } else {
            item.selectedIndex = null;
            item.isSelected = false;
          }
        }
        return item;
      });
      signUpDispatch(setModulesList(newList));
    } else {
      updatedDetails[index] = {
        ...updatedDetails[index],
        [name]: value,
      };
      setContactDetails(updatedDetails);
    }
  };

  const getErrorDetails = () => {
    if (isErrorCountryCodes)
      return {
        errorMessage: errorCountryCodes,
        onRetry: () => fetchData({}),
      };
    return {
      errorMessage: "",
      onRetry: () => {},
    };
  };

  const handleAddContactPerson = () => {
    setContactDetails([
      ...contactDetails,
      {
        countryCode: "",
        designation: "",
        emailId: "",
        mobileNo: "",
        modules: [],
        name: "",
        salutation: "",
      },
    ]);
  };

  const handleRemoveContactPerson = (index) => {
    if (!!index) {
      const updatedContactDetails = contactDetails.filter(
        (_, i) => i !== index
      );
      setContactDetails(updatedContactDetails);
    } else {
      setContactDetails([
        {
          countryCode: "",
          designation: "",
          emailId: "",
          mobileNo: "",
          modules: [],
          name: "",
          salutation: "",
        },
      ]);
      signUpDispatch(
        setModulesList(
          moduleListArrayToArrayOfObject(signUpState?.signUpDetail?.module_list)
        )
      );
    }
  };

  const getDisabledState = () => {
    if (allFieldsFilled()) {
      const allModulesSelected = signUpState?.modulesList.every(
        (module) => module.isSelected
      );
      return allModulesSelected;
    }
    return true;
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
        getDisabledState,
        unselectedModules,
        handleAddContactPerson,
        handleBlur,
        handleDismissToast,
        handleInputChange,
        handleRemoveContactPerson,
        handleClickNext,
        intl,
        isErrorCountryCodes,
        isGettingCountryCodes,
        isLoading,
        onClickGoToLogin,
        onClickNext,
        onGoBack,
        showConfirmationModal,
        setShowConfirmationModal,
        moduleList: signUpState?.modulesList,
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
