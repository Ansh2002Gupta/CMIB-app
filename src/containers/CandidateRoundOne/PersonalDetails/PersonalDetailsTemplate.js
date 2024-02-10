import React from "react";
import { ScrollView, View } from "@unthinkable/react-core-components";

import MultiRow from "../../../core/layouts/MultiRow";
import CardComponent from "../../../components/CardComponent";

import CommonText from "../../../components/CommonText";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import MobileNumberInput from "../../../components/MobileNumberInput";
import { numericValidator } from "../../../utils/validation";
import { GENDER, MARITAL_STATUS } from "../../../constants/constants";
import images from "../../../images";
import styles from "./PersonalDetails.style";

const PersonalDetailsTemplate = ({
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
}) => {
  const personalDetailsConfig = [
    {
      content: (
        <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.personal_details" })}
          </CommonText>
          <View style={isWebView ? styles.gridView : styles.gap}>
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.gender" })}
              placeholder={intl.formatMessage({ id: "label.gender" })}
              isMandatory
              isDropdown
              options={GENDER}
              value={gender}
              onChangeValue={onChangeGender}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.marital_status" })}
              placeholder={intl.formatMessage({ id: "label.marital_status" })}
              isMandatory
              isDropdown
              options={MARITAL_STATUS}
              value={maritalStatus}
              onChangeValue={onChangeMaritalStatus}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.date_of_birth" })}
              placeholder={intl.formatMessage({ id: "label.date_of_birth" })}
              isMandatory
              value={dob}
              rightIcon={images.iconCalendar}
              onChangeText={onChangeDob}
            />
            <CustomTextInput
              isPaddingNotRequired
              customStyle={styles.textInputContainer(isWebView)}
              label={intl.formatMessage({ id: "label.email" })}
              placeholder={intl.formatMessage({ id: "label.email" })}
              isMandatory
              value={email}
              onChangeText={onChangeEmail}
            />
            {isWebView ? (
              <>
                <View style={styles.textInputContainer(isWebView)}>
                  <CustomLabelView
                    label={intl.formatMessage({ id: "label.passport" })}
                    isMandatory
                  />
                  <CustomToggleComponent
                    isMandatory
                    customToggleStyle={styles.customToggleStyle}
                  />
                </View>
                <CustomTextInput
                  customStyle={styles.textInputContainer(false)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.passport_number" })}
                  placeholder={intl.formatMessage({
                    id: "label.passport_number",
                  })}
                  isMandatory
                  value={passportNumber}
                  onChangeText={onChangePassportNumber}
                />
              </>
            ) : (
              <>
                <View style={styles.row}>
                  <View style={styles.textInputContainer(isWebView)}>
                    <CustomLabelView
                      label={intl.formatMessage({ id: "label.passport" })}
                      isMandatory
                    />
                    <CustomToggleComponent
                      isMandatory
                      customToggleStyle={styles.customToggleStyle}
                    />
                  </View>
                  <View style={styles.passportNo}>
                    <CustomTextInput
                      customStyle={styles.textInputContainer(false)}
                      isPaddingNotRequired
                      label={intl.formatMessage({
                        id: "label.passport_number",
                      })}
                      placeholder={intl.formatMessage({
                        id: "label.passport_number",
                      })}
                      isMandatory
                      value={passportNumber}
                      onChangeText={onChangePassportNumber}
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </CardComponent>
      ),
    },
    {
      content: (
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
              onChangeText={onChangeAddress1}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address2" })}
              placeholder={intl.formatMessage({ id: "label.address2" })}
              isMultiline
              noOfRows={2}
              value={address2}
              onChangeText={onChangeAddress2}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address3" })}
              placeholder={intl.formatMessage({ id: "label.address3" })}
              isMultiline
              noOfRows={2}
              value={address3}
              onChangeText={onChangeAddress3}
            />
            <CustomTextInput
              isPaddingNotRequired
              customStyle={styles.textInputContainer(isWebView)}
              label={intl.formatMessage({ id: "label.country" })}
              placeholder={intl.formatMessage({ id: "label.country" })}
              isMandatory
              value={country}
              onChangeText={onChangeCountry}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.state" })}
              placeholder={intl.formatMessage({ id: "label.state" })}
              isMandatory
              value={state}
              onChangeText={onChangeState}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.city" })}
              placeholder={intl.formatMessage({ id: "label.city" })}
              isMandatory
              value={city}
              onChangeText={onChangeCity}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.pincode" })}
              placeholder={intl.formatMessage({ id: "label.pincode" })}
              isMandatory
              value={pincode}
              onChangeText={onChangePincode}
            />
            <View style={isWebView && { marginRight: 16 }}>
              <MobileNumberInput
                mobileFieldLabel="label.mobile_number"
                codeValue={countryCode}
                onChangeCode={onChangeCountryCode}
                onChangeMobNumber={(val) => {
                  numericValidator(val) && onChangeMobileNo(val);
                }}
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
              onChangeText={onChangePhoneNo}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.nationality" })}
              placeholder={intl.formatMessage({ id: "label.nationality" })}
              isMandatory
              value={nationality}
              onChangeText={onChangeNationality}
            />
          </View>
        </CardComponent>
      ),
    },
    {
      content: (
        <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.permanent_address" })}
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
              value={permanentAddress1}
              onChangeText={onChangePermanentAddress1}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address2" })}
              placeholder={intl.formatMessage({ id: "label.address2" })}
              isMultiline
              noOfRows={2}
              value={permanentAddress2}
              onChangeText={onChangePermanentAddress2}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address3" })}
              placeholder={intl.formatMessage({ id: "label.address3" })}
              isMultiline
              noOfRows={2}
              value={permanentAddress3}
              onChangeText={onChangePermanentAddress3}
            />
            <CustomTextInput
              isPaddingNotRequired
              customStyle={styles.textInputContainer(isWebView)}
              label={intl.formatMessage({ id: "label.country" })}
              placeholder={intl.formatMessage({ id: "label.country" })}
              isMandatory
              value={permanentCountry}
              onChangeText={onChangePermanentCountry}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.state" })}
              placeholder={intl.formatMessage({ id: "label.state" })}
              isMandatory
              value={permanentState}
              onChangeText={onChangePermanentState}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.city" })}
              placeholder={intl.formatMessage({ id: "label.city" })}
              isMandatory
              value={permanentCity}
              onChangeText={onChangePermanentCity}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.pincode" })}
              placeholder={intl.formatMessage({ id: "label.pincode" })}
              isMandatory
              value={permanentPincode}
              onChangeText={onChangePermanentPincode}
            />
          </View>
        </CardComponent>
      ),
    },
  ];
  return (
    <ScrollView>
      <MultiRow rows={personalDetailsConfig} style={styles.mainContainer} />
    </ScrollView>
  );
};

export default PersonalDetailsTemplate;
