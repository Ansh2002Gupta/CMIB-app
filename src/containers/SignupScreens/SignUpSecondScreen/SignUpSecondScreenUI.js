import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../../../components/ActionPairButton";
import CustomTextInput from "../../../components/CustomTextInput";
import FormWrapper from "../../../components/FormWrapper";
import HeaderTextWithLabelAndDescription from "../../../components/HeaderTextWithLabelAndDescription";
import LabelWithLinkText from "../../../components/LabelWithLinkText";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../../hooks/useIsWebView";
import images from "../../../images";
import { ENTITY_OPTIONS } from "../../../constants/constants";
import { numericValidator } from "../../../utils/validation";
import commonStyles from "../../../theme/styles/commonStyles";
import { getResponsiveStyles, style } from "./SignUpSecondScreen.style";

const SignUpSecondScreenUI = ({
  allFieldsFilled,
  errors,
  formData,
  handleDismissToast,
  handleInputChange,
  handleBlur,
  industryOptions,
  intl,
  isLoading,
  onClickNext,
  onClickGoToLogin,
  onGoBack,
  stateOptions,
  validationError,
}) => {
  const {
    address,
    code,
    companyName,
    currentIndustry,
    emailId,
    entity,
    noOfPartners,
    registrationNo,
    state,
    telephoneNo,
  } = formData;
  const isWeb = Platform.OS.toLowerCase() === "web";
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const showContentHeader =
    currentBreakpoint !== "xs" && currentBreakpoint !== "sm";

  const mobileProps =
    Platform.OS.toLowerCase() === "web"
      ? { isDropdown: true }
      : { dropDownModal: true };

  const renderFormContent = () => {
    return (
      <View style={style.formContainer}>
        <CustomTextInput
          label={intl.formatMessage({ id: "label.company_name" })}
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.company_name_placeholder",
          })}
          customHandleBlur={() => handleBlur("companyName")}
          value={companyName}
          errorMessage={errors.companyName}
          isError={!!errors.companyName}
          onChangeText={(val) => {
            handleInputChange(val, "companyName");
          }}
        />
        <CustomTextInput
          {...mobileProps}
          label={intl.formatMessage({ id: "label.entity" })}
          isMandatory
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
              customHandleBlur={() => handleBlur("registrationNo")}
              isMandatory
              isNumeric
              maxLength={10}
              errorMessage={errors.registrationNo}
              isError={!!errors.registrationNo}
              value={registrationNo}
              onChangeText={(val) =>
                numericValidator(val) &&
                handleInputChange(val, "registrationNo")
              }
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
              customHandleBlur={() => handleBlur("noOfPartners")}
              isNumeric
              maxLength={3}
              value={noOfPartners}
              errorMessage={errors.noOfPartners}
              isError={!!errors.noOfPartners}
              onChangeText={(val) =>
                numericValidator(val) && handleInputChange(val, "noOfPartners")
              }
            />
          </View>
        </View>
        <CustomTextInput
          {...mobileProps}
          label={intl.formatMessage({ id: "label.current_industry" })}
          isMandatory
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
          isMultiline={!isWeb}
          height={84}
          value={address}
          errorMessage={errors.address}
          customHandleBlur={() => handleBlur("address")}
          isError={!!errors.address}
          onChangeText={(val) => handleInputChange(val, "address")}
          placeholder={intl.formatMessage({
            id: "label.address_for_correspondance_placeholder",
          })}
        />
        <CustomTextInput
          {...mobileProps}
          label={intl.formatMessage({ id: "label.state" })}
          isMandatory
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
          customHandleBlur={() => handleBlur("emailId")}
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
              customHandleBlur={() => handleBlur("code")}
              isNumeric
              value={code}
              maxLength={4}
              errorMessage={errors.code}
              isError={!!errors.code}
              onChangeText={(val) =>
                numericValidator(val) && handleInputChange(val, "code")
              }
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
              customHandleBlur={() => handleBlur("telephoneNo")}
              errorMessage={errors.telephoneNo}
              isError={!!errors.telephoneNo}
              isMandatory
              isNumeric
              maxLength={15}
              value={telephoneNo}
              onChangeText={(val) =>
                numericValidator(val) && handleInputChange(val, "telephoneNo")
              }
            />
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => (
    <View style={style.signupFooterContainer}>
      <ActionPairButton
        buttonOneText={intl.formatMessage({ id: "label.back" })}
        buttonTwoText={intl.formatMessage({ id: "label.next" })}
        displayLoader={isLoading}
        iconRight={{
          rightIconAlt: "right-arrow",
          rightIconSource: images.iconArrowRightWhite,
        }}
        iconLeft={{
          leftIconAlt: "left-arrow",
          leftIconSource: images.iconArrowLeft,
        }}
        isDisabled={!allFieldsFilled()}
        isButtonTwoGreen
        onPressButtonOne={onGoBack}
        onPressButtonTwo={onClickNext}
        customStyles={{
          customContainerStyle: !isWebView
            ? { ...style.customSaveButtonContainer }
            : {},
        }}
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
    <FormWrapper onSubmit={onClickNext} customFormStyle={commonStyles.mainView}>
      <View
        style={
          isWebView
            ? getResponsiveStyles({ str: "signupContainer", currentBreakpoint })
            : style.innerContainer
        }
      >
        {isWebView && (
          <HeaderTextWithLabelAndDescription
            label={intl.formatMessage({ id: "label.step_two" })}
            {...(showContentHeader && {
              headerText: intl.formatMessage({
                id: "label.basic_details",
              }),
            })}
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
    </FormWrapper>
  );
};

SignUpSecondScreenUI.defaultProps = {
  handleDismissToast: () => {},
  industryOptions: [],
  stateOptions: [],
  validationError: "",
};

SignUpSecondScreenUI.propTypes = {
  allFieldsFilled: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleDismissToast: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  industryOptions: PropTypes.array,
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  stateOptions: PropTypes.array,
  validationError: PropTypes.string,
};

export default SignUpSecondScreenUI;
