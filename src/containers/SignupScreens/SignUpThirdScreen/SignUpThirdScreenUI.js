import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View, Text } from "@unthinkable/react-core-components";

import CustomTextInput from "../../../components/CustomTextInput";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import { SALUTATION_OPTIONS } from "../../../constants/constants";
import style from "./SignUpThirdScreen.style";

const SignUpThirdScreenUI = (props) => {
  const {
    intl,
    onGoBack,
    onClickNext,
    handleInputChange,
    salutation,
    mobileNo,
    emailId,
    designation,
    name,
    allFieldsFilled,
    errors,
    headerText,
  } = props;

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
        <Text style={style.headerText}>{headerText}</Text>
        <View style={style.inputContainer}>
          <CustomTextInput
            label={intl.formatMessage({
              id: "label.salutation",
            })}
            dropdownStyle={style.dropdownStyle}
            placeholder={intl.formatMessage({
              id: "label.select",
            })}
            errorMessage={errors.salutation}
            isError={!!errors.salutation}
            value={salutation}
            options={SALUTATION_OPTIONS}
            isMandatory
            onChangeValue={(val) => handleInputChange(val, "salutation")}
            isDropdown
          />
          <View style={style.secondInput}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.contact_person_name",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_contact_person_name",
              })}
              value={name}
              errorMessage={errors.name}
              isError={!!errors.name}
              onChangeText={(val) => handleInputChange(val, "name")}
              isMandatory
            />
          </View>
        </View>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.contact_personal_designation",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_contact_person_designation",
          })}
          errorMessage={errors.designation}
          isError={!!errors.designation}
          value={designation}
          onChangeText={(val) => handleInputChange(val, "designation")}
          isMandatory
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.mobile_number",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_contact_person_mobile_no",
          })}
          value={mobileNo}
          maxLength={15}
          keyboardType="numeric"
          onChangeText={(val) => handleInputChange(val, "mobileNo")}
          isMobileNumber
          errorMessage={errors.mobileNo}
          isError={!!errors.mobileNo}
          isMandatory
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.email_id",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_contact_person_email_id",
          })}
          errorMessage={errors.emailId}
          isError={!!errors.emailId}
          value={emailId}
          onChangeText={(val) => handleInputChange(val, "email")}
          isMandatory
        />
      </ScrollView>
      <View style={style.buttonContainer}>
        <SaveCancelButton
          buttonOneText={intl.formatMessage({ id: "label.back" })}
          onPressButtonOne={onGoBack}
          onPressButtonTwo={onClickNext}
          hasIconRight
          isNextDisabled={!allFieldsFilled()}
          buttonTwoText={intl.formatMessage({ id: "label.next" })}
        />
      </View>
    </>
  );
};

SignUpThirdScreenUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  salutation: PropTypes.string.isRequired,
  mobileNo: PropTypes.string.isRequired,
  emailId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  allFieldsFilled: PropTypes.func.isRequired,
  errors: PropTypes.object,
  headerText: PropTypes.string.isRequired,
};

export default SignUpThirdScreenUI;
