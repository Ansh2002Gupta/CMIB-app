import React, { useState, useEffect, useImperativeHandle } from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";

import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import MobileNumberInput from "../../../components/MobileNumberInput";
import { MESSAGE_MAX_LENGTH } from "../../../constants/constants";
import { numericValidator } from "../../../utils/validation";
import styles from "./PersonalDetails.style";

const CorrespondenceAddress = (
  {
    intl,
    isWebView,
    countryCodeData,
    onValidationChange = () => {},
    userProfileDetails,
    filledData,
  },
  ref
) => {
  // Inside your component
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState(""); // Assuming this is a string
  const [mobileNo, setMobileNo] = useState("");
  const [nationality, setNationality] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [state, setState] = useState("");

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        address: {
          type: "Correspondence",
          address_line_1: address1,
          address_line_2: address2,
          address_line_3: address3,
          city,
          country,
          state,
          pincode,
        },
        other: {
          mobile_country_code: countryCode?.split(" ")?.[0] || "",
          mobileNo,
          mobile_number: mobileNo,
          phoneNo,
          nationality,
        },
      };
    },
  }));

  useEffect(() => {
    if (userProfileDetails?.userDetails && countryCodeData) {
      userProfileDetails?.userDetails?.mobile_country_code &&
        setCountryCode(userProfileDetails?.userDetails?.mobile_country_code);
      let code = countryCodeData?.filter((item) =>
        item.dial_code.includes(
          userProfileDetails?.userDetails?.mobile_country_code
        )
      );
      code?.length > 0 &&
        setCountryCode(code[0]?.dial_code + " (" + code[0]?.name + ")");
      userProfileDetails?.userDetails?.mobile_number &&
        setMobileNo(userProfileDetails?.userDetails?.mobile_number);
    }
  }, [userProfileDetails, countryCodeData]);

  useEffect(() => {
    let res =
      address1.length > 3 &&
      city.length > 0 &&
      country.length > 0 &&
      countryCode.length > 0 &&
      mobileNo.length > 4 &&
      nationality.length > 0 &&
      pincode.length > 0 &&
      phoneNo.length > 0 &&
      state.length > 3;
    onValidationChange(res);
  }, [
    address1,
    city,
    country,
    countryCode,
    mobileNo,
    nationality,
    onValidationChange,
    phoneNo,
    pincode,
    state,
  ]);

  useEffect(() => {
    let tempData = filledData?.addresses?.filter(
      (item) => item.type === "Correspondence"
    );
    if (tempData && tempData?.length > 0) {
      let mainData = tempData[0];
      mainData?.address_line_1 && setAddress1(mainData.address_line_1);
      mainData?.address_line_2 && setAddress2(mainData.address_line_2);
      mainData?.address_line_3 && setAddress3(mainData.address_line_3);
      mainData?.city && setCity(mainData?.city);
      mainData?.country && setCountry(mainData?.country);
      mainData?.state && setState(mainData?.state);
      mainData?.pincode && setPincode(mainData?.pincode);
    }
    filledData?.phone_number && setPhoneNo(filledData?.phone_number);
  }, [filledData]);

  return (
    <CardComponent customStyle={styles.cardContainer}>
      <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
        {intl.formatMessage({ id: "label.correspondence_address" })}
      </CommonText>
      <View style={isWebView ? styles.gridView : styles.gap}>
        <CustomTextInput
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.address1" })}
          placeholder={intl.formatMessage({ id: "label.address1" })}
          isMandatory
          isMultiline
          noOfRows={2}
          value={address1}
          onChangeText={setAddress1}
          maxLength={MESSAGE_MAX_LENGTH}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.address2" })}
          placeholder={intl.formatMessage({ id: "label.address2" })}
          isMultiline
          noOfRows={2}
          value={address2}
          onChangeText={setAddress2}
          maxLength={MESSAGE_MAX_LENGTH}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(false)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.address3" })}
          placeholder={intl.formatMessage({ id: "label.address3" })}
          isMultiline
          noOfRows={2}
          value={address3}
          onChangeText={setAddress3}
          maxLength={MESSAGE_MAX_LENGTH}
        />
        <CustomTextInput
          isPaddingNotRequired
          customStyle={styles.textInputContainer(isWebView)}
          label={intl.formatMessage({ id: "label.country" })}
          placeholder={intl.formatMessage({ id: "label.country" })}
          isMandatory
          value={country}
          onChangeText={setCountry}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.state" })}
          placeholder={intl.formatMessage({ id: "label.state" })}
          isMandatory
          value={state}
          onChangeText={setState}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(false)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.city" })}
          placeholder={intl.formatMessage({ id: "label.city" })}
          isMandatory
          value={city}
          onChangeText={setCity}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.pincode" })}
          placeholder={intl.formatMessage({ id: "label.pincode" })}
          isMandatory
          value={pincode}
          onChangeText={setPincode}
        />
        <View style={isWebView && { marginRight: 16 }}>
          <MobileNumberInput
            mobileFieldLabel="label.mobile_number"
            codeValue={countryCode}
            onChangeCode={setCountryCode}
            onChangeMobNumber={(val) => {
              // numericValidator(val) && setMobileNo(val);
            }}
            isEditable={!userProfileDetails?.userDetails?.mobile_country_code}
            options={countryCodeData}
            mobNumberValue={mobileNo}
          />
        </View>
        <CustomTextInput
          customStyle={styles.textInputContainer(false)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.telephone_no" })}
          placeholder={intl.formatMessage({ id: "label.telephone_no" })}
          isMandatory
          value={phoneNo}
          onChangeText={setPhoneNo}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.nationality" })}
          placeholder={intl.formatMessage({ id: "label.nationality" })}
          isMandatory
          value={nationality}
          onChangeText={setNationality}
        />
      </View>
    </CardComponent>
  );
};

export default React.forwardRef(CorrespondenceAddress);
