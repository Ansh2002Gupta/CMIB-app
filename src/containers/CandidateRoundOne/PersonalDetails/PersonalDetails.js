import React, { useEffect } from "react";
import { ScrollView } from "@unthinkable/react-core-components";
import PersonalDetailsTemplate from "./PersonalDetailsTemplate";
import usePersonalDetailsAPI from "../../../services/apiServices/hooks/CandidateRoundeOne/usePersonalDetailsAPI";
import usePersonalDetails from "./controller/usePersonalDetails";
import MultiRow from "../../../core/layouts/MultiRow";
import CorrespondenceAddress from "./CorrespondenceAddress";
import PermanentAddress from "./PermanentAddress";
import styles from "./PersonalDetails.style";

const PersonalDetails = ({ countryCodeData, intl, isWebView }) => {
  const { handlePersonalDetails } = usePersonalDetailsAPI();

  useEffect(() => {
    handlePersonalDetails({
      successCallback: (personalDetails) => {
        //updatePersonalDetails(personalDetails, countryCodeData);
      },
      errorCallback: () => {},
    });
  }, [countryCodeData]);

  const personalDetailsConfig = [
    {
      content: <PersonalDetailsTemplate intl={intl} isWebView={isWebView}/>,
    },
    {
      content: <CorrespondenceAddress intl={intl} isWebView={isWebView} countryCodeData={countryCodeData}/>,
    },
    {
      content: <PermanentAddress intl={intl} isWebView={isWebView}/>
    },
  ];

  return(
    <ScrollView>
      <MultiRow rows={personalDetailsConfig} style={styles.mainContainer} />
    </ScrollView>
  )
  // return (
  //   <PersonalDetailsTemplate
  //     {...{
  //       address1,
  //       address2,
  //       address3,
  //       city,
  //       country,
  //       countryCode,
  //       countryCodeData,
  //       dob,
  //       email,
  //       gender,
  //       intl,
  //       isWebView,
  //       maritalStatus,
  //       mobileNo,
  //       nationality,
  //       onChangeAddress1,
  //       onChangeAddress2,
  //       onChangeAddress3,
  //       onChangeCity,
  //       onChangeCountry,
  //       onChangeCountryCode,
  //       onChangeDob,
  //       onChangeEmail,
  //       onChangeGender,
  //       onChangeMaritalStatus,
  //       onChangeMobileNo,
  //       onChangeNationality,
  //       onChangePassportNumber,
  //       onChangePermanentAddress1,
  //       onChangePermanentAddress2,
  //       onChangePermanentAddress3,
  //       onChangePermanentCity,
  //       onChangePermanentCountry,
  //       onChangePermanentPincode,
  //       onChangePermanentState,
  //       onChangePincode,
  //       onChangePhoneNo,
  //       onChangeState,
  //       passportNumber,
  //       permanentAddress1,
  //       permanentAddress2,
  //       permanentAddress3,
  //       permanentCity,
  //       permanentCountry,
  //       permanentPincode,
  //       permanentState,
  //       pincode,
  //       phoneNo,
  //       state,
  //     }}
  //   />
  // );
};

export default PersonalDetails;
