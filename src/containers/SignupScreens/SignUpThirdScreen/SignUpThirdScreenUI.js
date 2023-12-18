import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import HeaderTextWithLabelAndDescription from "../../../components/HeaderTextWithLabelAndDescription/HeaderTextWithLabelAndDescription";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import LabelWithLinkText from "../../../components/LabelWithLinkText/LabelWithLinkText";
import useIsWebView from "../../../hooks/useIsWebView";
import { SALUTATION_OPTIONS } from "../../../constants/constants";
import style from "./SignUpThirdScreen.style";

const SignUpThirdScreenUI = ({
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
  onClickGoToLogin,
}) => {
  const isWeb = Platform.OS === "web";
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "signupContainer": {
        if (
          currentBreakpoint === "sm" ||
          currentBreakpoint === "xs" ||
          currentBreakpoint === "md"
        ) {
          return {
            ...style.signupContainer,
            ...style.smSignupContainer,
          };
        }
        return {
          ...style.signupContainer,
        };
      }
      default:
        return;
    }
  };

  const renderFormContent = () => {
    return (
      <View style={style.formContainer}>
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
      </View>
    );
  };

  const renderFooterContent = () => {
    return (
      <View style={!isWeb ? style.buttonContainer : style.webSignupFooter}>
        <SaveCancelButton
          buttonOneText={intl.formatMessage({ id: "label.back" })}
          onPressButtonOne={onGoBack}
          onPressButtonTwo={onClickNext}
          hasIconRight
          // isNextDisabled={!allFieldsFilled()}
          buttonTwoText={intl.formatMessage({ id: "label.next" })}
        />
        {isWebView && (
          <LabelWithLinkText
            labelText={intl.formatMessage({ id: "label.already_account" })}
            linkText={intl.formatMessage({ id: "label.login_here" })}
            onLinkClick={onClickGoToLogin}
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={
        isWebView
          ? getResponsiveStyles("signupContainer")
          : style.innerContainer
      }
    >
      {isWebView && (
        <View>
          <HeaderTextWithLabelAndDescription
            label={intl.formatMessage({ id: "label.step_three" })}
            headerText={intl.formatMessage({
              id: "label.contact_person_details",
            })}
          />
        </View>
      )}
      {isWebView ? (
        <View style={style.webContainerStyle}>
          {renderFormContent()}
          {renderFooterContent()}
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.contentContainerStyle}
          >
            {renderFormContent()}
          </ScrollView>
          {renderFooterContent()}
        </>
      )}
    </View>
  );
};

SignUpThirdScreenUI.propTypes = {
  allFieldsFilled: PropTypes.func.isRequired,
  designation: PropTypes.string.isRequired,
  emailId: PropTypes.string.isRequired,
  errors: PropTypes.object,
  handleInputChange: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  mobileNo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  salutation: PropTypes.string.isRequired,
};

export default SignUpThirdScreenUI;
