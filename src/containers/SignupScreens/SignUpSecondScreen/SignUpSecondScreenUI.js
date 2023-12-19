import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import CustomTextInput from "../../../components/CustomTextInput";
import HeaderTextWithLabelAndDescription from "../../../components/HeaderTextWithLabelAndDescription/HeaderTextWithLabelAndDescription";
import LabelWithLinkText from "../../../components/LabelWithLinkText/LabelWithLinkText";
import SaveCancelButton from "../../../components/SaveCancelButton/SaveCancelButton";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../../hooks/useIsWebView";
import { ENTITY_OPTIONS } from "../../../constants/constants";
import style from "./SignUpSecondScreen.style";

const SignUpSecondScreenUI = ({
  intl,
  onGoBack,
  onClickNext,
  formData,
  handleInputChange,
  errors,
  allFieldsFilled,
  industryOptions,
  stateOptions,
  onClickGoToLogin,
  validationError,
  handleDismissToast
}) => {
  const {
    companyName,
    registrationNo,
    noOfPartners,
    address,
    emailId,
    telephoneNo,
    code,
    entity,
    currentIndustry,
    state,
  } = formData;

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
        <CustomTextInput
          label={intl.formatMessage({ id: "label.company_name" })}
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.company_name_placeholder",
          })}
          value={companyName}
          errorMessage={errors.companyName}
          isError={!!errors.companyName}
          onChangeText={(val) => handleInputChange(val, "companyName")}
        />
        <CustomTextInput
          label={intl.formatMessage({ id: "label.entity" })}
          isMandatory
          isDropdown
          placeholder={intl.formatMessage({
            id: "label.select_entity_placeholder",
          })}
          value={entity}
          errorMessage={errors.entity}
          isError={!!errors.entity}
          onChangeValue={(val) => handleInputChange(val, "entity")}
          options={ENTITY_OPTIONS}
        />
        <View style={style.inputContainer}>
          <View style={style.registrationInput}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.firm_registration_no",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_firm_no",
              })}
              isMandatory
              keyboardType="numeric"
              maxLength={10}
              errorMessage={errors.registrationNo}
              isError={!!errors.registrationNo}
              value={registrationNo}
              onChangeText={(val) => handleInputChange(val, "registrationNo")}
            />
          </View>
          <View style={style.partnerInput}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.no_of_partners",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_no",
              })}
              isMandatory
              keyboardType="numeric"
              value={noOfPartners}
              errorMessage={errors.noOfPartners}
              isError={!!errors.noOfPartners}
              onChangeText={(val) => handleInputChange(val, "noOfPartners")}
            />
          </View>
        </View>
        <CustomTextInput
          label={intl.formatMessage({ id: "label.current_industry" })}
          isMandatory
          isDropdown
          placeholder={intl.formatMessage({
            id: "label.select_current_indusrty_placeholder",
          })}
          labelField="name"
          valueField="id"
          inputKey="id"
          value={currentIndustry}
          options={industryOptions || []}
          onChangeValue={(val) => handleInputChange(val, "currentIndustry")}
        />
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.address_for_correspondence",
          })}
          isMandatory
          isMultiline
          height={84}
          value={address}
          errorMessage={errors.address}
          isError={!!errors.address}
          onChangeText={(val) => handleInputChange(val, "address")}
          placeholder={intl.formatMessage({
            id: "label.address_for_correspondance_placeholder",
          })}
        />
        <CustomTextInput
          label={intl.formatMessage({ id: "label.state" })}
          isMandatory
          isDropdown
          labelField="name"
          valueField="state_code"
          placeholder={intl.formatMessage({
            id: "label.select_state",
          })}
          inputKey="state_code"
          value={state}
          options={stateOptions || []}
          onChangeValue={(val) => handleInputChange(val, "state")}
        />
        <CustomTextInput
          label={intl.formatMessage({ id: "label.email_id" })}
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.email_id_placeholder",
          })}
          value={emailId}
          errorMessage={errors.emailId}
          isError={!!errors.emailId}
          onChangeText={(val) => handleInputChange(val, "emailId")}
        />
        <View style={style.inputContainer}>
          <View style={style.codeInput}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.isd_std_code",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_code",
              })}
              keyboardType="numeric"
              value={code}
              maxLength={15}
              errorMessage={errors.code}
              isError={!!errors.code}
              onChangeText={(val) => handleInputChange(val, "code")}
              isMandatory
            />
          </View>
          <View style={style.noInput}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.telephone_no",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_telephone_no",
              })}
              errorMessage={errors.telephoneNo}
              isError={!!errors.telephoneNo}
              isMandatory
              keyboardType="numeric"
              maxLength={15}
              value={telephoneNo}
              onChangeText={(val) => handleInputChange(val, "telephoneNo")}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => (
    <View style={style.signupFooterContainer}>
      <SaveCancelButton
        buttonOneText={intl.formatMessage({ id: "label.back" })}
        onPressButtonOne={onGoBack}
        onPressButtonTwo={onClickNext}
        hasIconRight
        // isNextDisabled={!allFieldsFilled()}
        buttonTwoText={intl.formatMessage({ id: "label.next" })}
        customSaveButtonContainer={isWebView && style.customSaveButtonContainer}
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

  return (
    <View
      style={
        isWebView
          ? getResponsiveStyles("signupContainer")
          : style.innerContainer
      }
    >
      {isWebView && (
        <HeaderTextWithLabelAndDescription
          label={intl.formatMessage({ id: "label.step_two" })}
          headerText={intl.formatMessage({ id: "label.basic_details" })}
        />
      )}
      {!isWeb ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.contentContainerStyle}
        >
          {renderFormContent()}
        </ScrollView>
      ) : (
        <View
          style={
            !isWebView
              ? [style.contentContainerStyle, style.webContentContainer]
              : style.webContentContainer
          }
        >
          {renderFormContent()}
          {renderFooter()}
        </View>
      )}
      {!isWeb && renderFooter()}
      {!!validationError && (
        <ToastComponent
          toastMessage={validationError}
          onDismiss={handleDismissToast}
        />
      )}
    </View>
  );
};

SignUpSecondScreenUI.propTypes = {
  allFieldsFilled: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  handleDismissToast: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  industryOptions: PropTypes.array,
  intl: PropTypes.object.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  stateOptions: PropTypes.array,
  validationError: PropTypes.string,
};

export default SignUpSecondScreenUI;
