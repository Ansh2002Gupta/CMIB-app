import React, { useEffect } from "react";

import PersonalDetailsTemplate from "./PersonalDetailsTemplate";
import usePersonalDetailsAPI from "../../../services/apiServices/hooks/CandidateRoundeOne/usePersonalDetailsAPI";
import usePersonalDetails from "./controller/usePersonalDetails";

const PersonalDetails = ({ countryCodeData, intl, isWebView }) => {
  const { handlePersonalDetails } = usePersonalDetailsAPI();

  const {
    address1,
    address2,
    address3,
    city,
    dob,
    country,
    countryCode,
    email,
    gender,
    maritalStatus,
    mobileNo,
    nationality,
    onChangeAddress1,
    onChangeAddress2,
    onChangeAddress3,
    onChangeCity,
    onChangeCountry,
    onChangeCountryCode,
    onChangeDob,
    onChangeEmail,
    onChangeGender,
    onChangeMaritalStatus,
    onChangeMobileNo,
    onChangeNationality,
    onChangePassportNumber,
    onChangePermanentAddress1,
    onChangePermanentAddress2,
    onChangePermanentAddress3,
    onChangePermanentCity,
    onChangePermanentCountry,
    onChangePermanentPincode,
    onChangePermanentState,
    onChangePincode,
    onChangePhoneNo,
    onChangeState,
    updatePersonalDetails,
    passportNumber,
    permanentAddress1,
    permanentAddress2,
    permanentAddress3,
    permanentCity,
    permanentCountry,
    permanentPincode,
    permanentState,
    pincode,
    phoneNo,
    state,
  } = usePersonalDetails();

  useEffect(() => {
    handlePersonalDetails({
      successCallback: (personalDetails) => {
        updatePersonalDetails(personalDetails, countryCodeData);
      },
      errorCallback: () => {},
    });
  }, [countryCodeData]);

  return (
    <PersonalDetailsTemplate
      {...{
        address1,
        address2,
        address3,
        city,
        country,
        countryCode,
        countryCodeData,
        dob,
        email,
        gender,
        intl,
        isWebView,
        maritalStatus,
        mobileNo,
        nationality,
        onChangeAddress1,
        onChangeAddress2,
        onChangeAddress3,
        onChangeCity,
        onChangeCountry,
        onChangeCountryCode,
        onChangeDob,
        onChangeEmail,
        onChangeGender,
        onChangeMaritalStatus,
        onChangeMobileNo,
        onChangeNationality,
        onChangePassportNumber,
        onChangePermanentAddress1,
        onChangePermanentAddress2,
        onChangePermanentAddress3,
        onChangePermanentCity,
        onChangePermanentCountry,
        onChangePermanentPincode,
        onChangePermanentState,
        onChangePincode,
        onChangePhoneNo,
        onChangeState,
        passportNumber,
        permanentAddress1,
        permanentAddress2,
        permanentAddress3,
        permanentCity,
        permanentCountry,
        permanentPincode,
        permanentState,
        pincode,
        phoneNo,
        state,
      }}
    />
  );
};

export default PersonalDetails;
