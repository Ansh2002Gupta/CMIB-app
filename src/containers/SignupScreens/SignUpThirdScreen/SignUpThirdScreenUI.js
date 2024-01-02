import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import {
  CAREER_ASCENTS,
  CA_JOBS,
  NEWLY_QUALIFIED,
  OVERSEAS_PLACEMENTS,
  SALUTATION_OPTIONS,
  WOMENT_PLACEMENT,
} from "../../../constants/constants";
import style from "./SignUpThirdScreen.style";

const SignUpThirdScreenUI = (props) => {
  const {
    allFieldsFilled,
    contactDetails,
    errors,
    handleDismissToast,
    handleInputChange,
    intl,
    isLoading,
    onClickNext,
    onGoBack,
    validationError,
  } = props;

  const getHeaderText = (module, intl) => {
    switch (module) {
      case CA_JOBS:
        return intl.formatMessage({ id: "label.for_ca_jobs" });
      case NEWLY_QUALIFIED:
        return intl.formatMessage({ id: "label.for_new_ca_placement" });
      case OVERSEAS_PLACEMENTS:
        return intl.formatMessage({ id: "label.for_overseas_placements" });
      case CAREER_ASCENTS:
        return intl.formatMessage({ id: "label.for_career_ascents" });
      case WOMENT_PLACEMENT:
        return intl.formatMessage({ id: "label.for_women_placements" });
      default:
        return intl.formatMessage({ id: "label.for_ca_jobs" });
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={style.contentContainerStyle}
      >
        {contactDetails.map((detail, index) => (
          <View key={String(index)}>
            <CommonText
              customTextStyle={style.headerText}
              title={getHeaderText(detail.module, intl)}
            />
            <View style={style.inputContainer}>
              <CustomTextInput
                label={intl.formatMessage({
                  id: "label.salutation",
                })}
                dropdownStyle={style.dropdownStyle}
                placeholder={intl.formatMessage({
                  id: "label.select",
                })}
                errorMessage={errors[index].salutation}
                isError={!!errors[index].salutation}
                value={contactDetails[index].salutation}
                options={SALUTATION_OPTIONS}
                isMandatory
                onChangeValue={(val) =>
                  handleInputChange(val, "salutation", index)
                }
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
                  value={contactDetails[index].name}
                  errorMessage={errors[index].name}
                  isError={!!errors[index].name}
                  onChangeText={(val) => handleInputChange(val, "name", index)}
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
              errorMessage={errors[index].designation}
              isError={!!errors[index].designation}
              value={contactDetails[index].designation}
              onChangeText={(val) =>
                handleInputChange(val, "designation", index)
              }
              isMandatory
            />
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.mobile_number",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_contact_person_mobile_no",
              })}
              value={contactDetails[index].mobileNo}
              maxLength={10}
              keyboardType="numeric"
              onChangeText={(val) => handleInputChange(val, "mobileNo", index)}
              isMobileNumber
              errorMessage={errors[index].mobileNo}
              isError={!!errors[index].mobileNo}
              isMandatory
            />
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.email_id",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_contact_person_email_id",
              })}
              errorMessage={errors[index].emailId}
              isError={!!errors[index].emailId}
              value={contactDetails[index].emailId}
              onChangeText={(val) => handleInputChange(val, "emailId", index)}
              isMandatory
            />
            {index < contactDetails.length - 1 && contactDetails.length > 1 && (
              <View style={style.dividerStyle} />
            )}
          </View>
        ))}
      </ScrollView>
      <View style={style.buttonContainer}>
        <SaveCancelButton
          buttonOneText={intl.formatMessage({ id: "label.back" })}
          buttonTwoText={intl.formatMessage({ id: "label.next" })}
          displayLoader={isLoading}
          hasIconLeft
          hasIconRight
          isNextDisabled={!allFieldsFilled()}
          onPressButtonOne={onGoBack}
          onPressButtonTwo={onClickNext}
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
  contactDetails: PropTypes.array.isRequired,
  errors: PropTypes.array,
  handleDismissToast: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  validationError: PropTypes.string,
};

export default SignUpThirdScreenUI;
