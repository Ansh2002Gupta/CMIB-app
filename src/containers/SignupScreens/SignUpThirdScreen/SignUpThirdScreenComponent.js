import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import SignUpThirdScreenUI from "./SignUpThirdScreenUI";
import useValidateSignUp from "../../../services/apiServices/hooks/useValidateSignUp";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";
import { validateEmail } from "../../../constants/CommonFunctions";
import { numRegex } from "../../../constants/constants";

const SignUpThirdScreenComponent = ({ tabHandler }) => {
  const intl = useIntl();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const initialContactDetails = signUpState.signUpDetail.contact_details || [];
  const { handleSignUpValidation } = useValidateSignUp();

  const [contactDetails, setContactDetails] = useState(
    initialContactDetails.map((contact) => ({
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

  useEffect(() => {
    setContactDetails(
      initialContactDetails.map((contact) => ({
        designation: contact.designation || "",
        emailId: contact.email || "",
        mobileNo: contact.mobile_number || "",
        module: contact.module || "",
        name: contact.name || "",
        salutation: contact.salutation || "",
      }))
    );
  }, [initialContactDetails]);

  const allFieldsFilled = () => {
    return contactDetails.every((detail) => {
      const requiredFields = [
        detail.designation,
        detail.emailId,
        detail.mobileNo,
        detail.name,
      ];
      return requiredFields.every((field) => String(field).trim() !== "");
    });
  };

  const validateFields = () => {
    const newErrors = contactDetails.map((detail) => {
      let error = {
        designation: "",
        emailId: "",
        mobileNo: "",
        name: "",
      };

      if (detail.name.length < 6 || detail.name.length > 255) {
        error.name = intl.formatMessage({
          id: "label.contact_person_validation",
        });
      }

      if (detail.designation.length < 6 || detail.designation.length > 500) {
        error.designation = intl.formatMessage({
          id: "label.designation_validation",
        });
      }

      if (
        !numRegex.test(String(detail.mobileNo)) ||
        detail.mobileNo.length > 15 ||
        detail.mobileNo.length < 7
      ) {
        error.mobileNo = intl.formatMessage({
          id: "label.mobile_number_validation",
        });
      }

      if (validateEmail(detail.emailId)) {
        error.emailId = intl.formatMessage({ id: "label.email_id_validation" });
      }

      return error;
    });

    setErrors(newErrors);
    return newErrors.every((error) =>
      Object.values(error).every((fieldError) => fieldError === "")
    );
  };

  const onGoBack = () => {
    tabHandler("prev");
  };

  const onClickNext = () => {
    const isValid = validateFields();
    if (isValid) {
      const updatedContactDetails = contactDetails.map((detail) => ({
        name: detail.name,
        email: detail.emailId,
        salutation: detail.salutation,
        mobile_number: detail.mobileNo,
        designation: detail.designation,
        mobile_country_code: "+91",
      }));

      const newContactDetails = {
        contact_details: updatedContactDetails,
      };

      handleSignUpValidation(
        newContactDetails,
        () => {
          signUpDispatch(setSignUpDetails(newContactDetails));
          tabHandler("next");
        },
        (error) => {
          console.error("ERROR:", error);
        }
      );
    }
  };

  const handleInputChange = (value, name, index) => {
    const updatedDetails = [...contactDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [name]: value,
    };
    setContactDetails(updatedDetails);
  };

  return (
    <SignUpThirdScreenUI
      allFieldsFilled={allFieldsFilled}
      contactDetails={contactDetails}
      errors={errors}
      intl={intl}
      onClickNext={onClickNext}
      onGoBack={onGoBack}
      handleInputChange={handleInputChange}
    />
  );
};

SignUpThirdScreenComponent.propTypes = {
  tabHandler: PropTypes.func.isRequired,
};

export default SignUpThirdScreenComponent;
