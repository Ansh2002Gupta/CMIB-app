import { useState } from "react";
import { formatDate } from "../../../../utils/util";

const usePersonalDetails = () => {
   const [email, setEmail] = useState("");
   const [passportNumber, setpassportNumber] = useState("");
   const [address1, setAddress1] = useState("");
   const [address2, setAddress2] = useState("");
   const [address3, setAddress3] = useState("");
   const [country, setCountry] = useState("");
   const [countryCode, setCountryCode] = useState("");
   const [state, setState] = useState("");
   const [city, setCity] = useState("");
   const [pincode, setPincode] = useState("");
   const [mobileNo, setMobileNo] = useState("");
   const [phoneNo, setPhoneNo] = useState("");
   const [nationality, setNationality] = useState("");
   const [permanentAddress1, setPermanentAddress1] = useState("");
   const [permanentAddress2, setPermanentAddress2] = useState("");
   const [permanentAddress3, setPermanentAddress3] = useState("");
   const [permanentCountry, setPermanentCountry] = useState("");
   const [permanentState, setPermanentState] = useState("");
   const [permanentCity, setPermanentCity] = useState("");
   const [permanentPincode, setPermanentPincode] = useState("");
   const [gender, setGender] = useState("");
   const [maritalStatus, setMaritalStatus] = useState("");
   const [dob, setDob] = useState("");


   const onChangeEmail = (val) => {
    setEmail(val);
   }

   const onChangePassportNumber = (val) => {
    setpassportNumber(val);
   }

   const onChangeAddress1 = (val) => {
    setAddress1(val);
   }
   const onChangeAddress2 = (val) => {
    setAddress2(val);
   }
   const onChangeAddress3 = (val) => {
    setAddress3(val);
   }
   const onChangeCountry = (val) => {
    setCountry(val);
   }
   const onChangeCountryCode = (val) => {
    setCountryCode(val);
   }
   const onChangeState = (val) => {
    setState(val);
   }
   const onChangeCity = (val) => {
    setCity(val);
   }
   const onChangePincode = (val) => {
    setPincode(val);
   }
   const onChangeMobileNo = (val) => {
    setMobileNo(val);
   }
   const onChangePhoneNo = (val) => {
    setPhoneNo(val);
   }
   const onChangeNationality = (val) => {
    setNationality(val);
   }

   const onChangePermanentAddress1 = (val) => {
    setPermanentAddress1(val);
   }
   const onChangePermanentAddress2 = (val) => {
    setPermanentAddress2(val);
   }
   const onChangePermanentAddress3 = (val) => {
    setPermanentAddress3(val);
   }
   const onChangePermanentCountry = (val) => {
    setPermanentCountry(val);
   }
   const onChangePermanentState = (val) => {
    setPermanentState(val);
   }
   const onChangePermanentCity = (val) => {
    setPermanentCity(val);
   }
   const onChangePermanentPincode = (val) => {
    setPermanentPincode(val);
   }
   const onChangeGender = (val) => {
    setGender(val);
   }
   const onChangeDob = (val) => {
    setDob(val);
   }
   const onChangeMaritalStatus = (val) => {
    setMaritalStatus(val);
   }
   

   const updatePersonalDetails = (profileDetails, countryCodeData) => {
    setAddress1(profileDetails?.full_address || "");
    setDob(formatDate(profileDetails?.dob || ""));
    setEmail(profileDetails?.email || "");
    setGender(profileDetails?.gender || "");
    setMobileNo(profileDetails?.mobile_number || "");
    setCountryCode(getCountryCode(profileDetails?.mobile_country_code || "", countryCodeData));
   }

   function getCountryCode(code, countryCodeData){
      let countryCode = countryCodeData?.find((country) => {
         return code == country?.dial_code;
      })
      return `${countryCode?.dial_code} (${countryCode?.name})`;
   }

   return {
    address1,
    address2,
    address3,
    city,
    country,
    countryCode,
    dob,
    email,
    gender,
    maritalStatus,
    mobileNo,
    nationality,
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
   };
};

export default usePersonalDetails;