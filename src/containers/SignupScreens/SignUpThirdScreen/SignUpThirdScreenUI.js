import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import { SALUTATION_OPTIONS } from "../../../constants/constants";
import style from "./SignUpThirdScreen.style";

const SignUpThirdScreenUI = (props) => {
  const {
    allFieldsFilled,
    designation,
    emailId,
    errors,
    handleDismissToast,
    handleInputChange,
    headerText,
    intl,
    onGoBack,
    onClickNext,
    salutation,
    name,
    mobileNo,
    validationError,
  } = props;

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
        <CommonText customTextStyle={style.headerText} title={headerText} />
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
          hasIconLeft
        />
      </View>
      {!!validationError && (
        <ToastComponent
          toastMessage={validationError}
          onDismiss={handleDismissToast}
        />
      )}
    </>
  );
};

SignUpThirdScreenUI.propTypes = {
  allFieldsFilled: PropTypes.func.isRequired,
  designation: PropTypes.string.isRequired,
  emailId: PropTypes.string.isRequired,
  errors: PropTypes.object,
  handleDismissToast: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  salutation: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  mobileNo: PropTypes.string.isRequired,
  toastMessage: PropTypes.string,
};

export default SignUpThirdScreenUI;
