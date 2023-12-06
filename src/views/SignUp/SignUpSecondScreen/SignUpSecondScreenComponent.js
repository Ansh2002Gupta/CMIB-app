import React, { useState, useContext } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";
import { SignUpContext } from "../../../globalContext/signUp/signUpProvider";
import { setSignUpDetails } from "../../../globalContext/signUp/signUpActions";

import SignUpSecondScreenUI from "./SignUpSecondScreenUI";
import { validateEmail } from "../../../constants/CommonFunctions";
import { numRegex } from "../../../constants/constants";

const SignUpSecondScreenComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [signUpState, signUpDispatch] = useContext(SignUpContext);
  const [companyName, setCompanyName] = useState(
    signUpState.signUpDetail.name || ""
  );
  const [registrationNo, setRegistrationNo] = useState(
    signUpState.signUpDetail.frn_number || ""
  );
  const [noOfPartners, setNoOfPartners] = useState(
    signUpState.signUpDetail.number_of_partner || ""
  );
  const [address, setAddress] = useState(
    signUpState.signUpDetail.address || ""
  );
  const [emailId, setEmailId] = useState(signUpState.signUpDetail.email || "");

  const [telephoneNo, setTelephoneNo] = useState(
    signUpState.signUpDetail.telephone_number || ""
  );
  const [code, setCode] = useState(
    signUpState.signUpDetail.std_country_code || ""
  );

  const [entity, setEntity] = useState(signUpState.signUpDetail.entity || "");

  const [currentIndustry, setCurrentIndustry] = useState(
    signUpState.signUpDetail.industry_type || ""
  );

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
    const requiredFields = [
      companyName,
      registrationNo,
      noOfPartners,
      address,
      emailId,
      telephoneNo,
      code,
      entity,
      currentIndustry,
    ];
    return requiredFields.every((field) => field.trim() !== "");
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

    if (companyName.length < 6 || companyName.length > 255) {
      newErrors.companyName =
        "Company name must be between 6 and 255 characters.";
      isValid = false;
    }

    if (numRegex.test(String(code)) || code.length < 2 || code.length > 8) {
      newErrors.code =
        "Country code must be a combination of numbers and between 2 and 8 digits.";
      isValid = false;
    }

    if (
      numRegex.test(String(telephoneNo)) ||
      telephoneNo.length > 15 ||
      telephoneNo.length < 7
    ) {
      newErrors.telephoneNo =
        "Telephone number must be a combination of numbers and between 7 and 15 digits.";
      isValid = false;
    }

    if (validateEmail(emailId)) {
      newErrors.emailId = "Email ID must be valid.";
      isValid = false;
    }

    if (numRegex.test(String(registrationNo)) || registrationNo.length !== 10) {
      newErrors.registrationNo =
        "Registration number must be exactly 10 digits.";
      isValid = false;
    }

    if (address.length < 6 || address.length > 500) {
      newErrors.address = "Address must be between 6 and 500 characters.";
      isValid = false;
    }

    if (numRegex.test(String(noOfPartners))) {
      newErrors.noOfPartners =
        "Number of partners must be a combination of numbers.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onClickGoToLogin = () => {
    navigate("/");
  };

  const onGoBack = () => {
    navigate("/signup");
  };

  const onClickNext = () => {
    if (validateFields()) {
      const details = {
        name: companyName,
        email: emailId,
        entity: entity,
        frn_number: registrationNo,
        number_of_partner: parseInt(noOfPartners, 10),
        telephone_number: telephoneNo,
        address: address,
        std_country_code: code,
      };
      signUpDispatch(setSignUpDetails(details));
      navigate("/signupThirdScreen");
    }
  };

  const handleInputChange = (value, name) => {
    switch (name) {
      case "registrationNo":
        setRegistrationNo(value);
        break;
      case "noOfPartners":
        setNoOfPartners(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "email":
        setEmailId(value);
        break;
      case "telephoneNo":
        setTelephoneNo(value);
        break;
      case "code":
        setCode(value);
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "entity":
        setEntity(value);
        break;
      case "currentIndustry":
        setCurrentIndustry(value);
        break;
      default:
        break;
    }
  };

  return (
    <SignUpSecondScreenUI
      intl={intl}
      onClickGoToLogin={onClickGoToLogin}
      onGoBack={onGoBack}
      onClickNext={onClickNext}
      companyName={companyName}
      registrationNo={registrationNo}
      noOfPartners={noOfPartners}
      address={address}
      emailId={emailId}
      entity={entity}
      currentIndustry={currentIndustry}
      telephoneNo={telephoneNo}
      code={code}
      handleInputChange={handleInputChange}
      errors={errors}
      allFieldsFilled={allFieldsFilled}
    />
  );
};

export default SignUpSecondScreenComponent;
