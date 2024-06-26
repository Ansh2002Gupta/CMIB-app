import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../../../components/ActionPairButton";
import CustomTextInput from "../../../components/CustomTextInput";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import FormWrapper from "../../../components/FormWrapper";
import HeaderTextWithLabelAndDescription from "../../../components/HeaderTextWithLabelAndDescription";
import KeyboardAwareScrollView from "../../../components/KeyboardAwareScrollView";
import LabelWithLinkText from "../../../components/LabelWithLinkText";
import LoadingScreen from "../../../components/LoadingScreen";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../../hooks/useIsWebView";
import images from "../../../images";
import {
  ADDRESS_MAX_LENGTH,
  ENTITY_OPTIONS,
  DEFAULT_INPUT_MAX_LENGTH,
  FIRM_OF_CHARTERED_ACCOUNTANTS,
  FIRM_REGISTRATION_NO_LENGTH,
  NUMBER_MAX_LENGTH,
  NUMBER_OF_PARTNERS_LENGTH,
} from "../../../constants/constants";
import {
  alphaNumericValidator,
  numericValidator,
} from "../../../utils/validation";
import commonStyles from "../../../theme/styles/commonStyles";
import { getResponsiveStyles, getStyles } from "./SignUpSecondScreen.style";

const SignUpSecondScreenUI = ({
  addressRef,
  allFieldsFilled,
  codeRef,
  companyNameRef,
  errors,
  emailIdRef,
  formData,
  firmRegistrationRef,
  getErrorDetails,
  handleDismissToast,
  handleInputChange,
  handleBlur,
  intl,
  industryOptions,
  isErrorGettingStates,
  isErrorGettingIndustries,
  isGettingIndustries,
  isLoading,
  isGettingStates,
  noOfPartnersRef,
  onClickNext,
  onClickGoToLogin,
  onGoBack,
  stateOptions,
  telephoneNoRef,
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
  const theme = useTheme();
  const style = getStyles(theme);

  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const showContentHeader =
    currentBreakpoint !== "xs" && currentBreakpoint !== "sm";

  const renderFormContent = () => {
    return (
      <View style={style.formContainer}>
        <CustomTextInput
          customHandleBlur={() => handleBlur("companyName")}
          errorMessage={errors.companyName}
          fieldRef={companyNameRef}
          isError={!!errors.companyName}
          isMandatory
          label={intl.formatMessage({ id: "label.company_name" })}
          maxLength={DEFAULT_INPUT_MAX_LENGTH}
          onChangeText={(val) => {
            handleInputChange(val, "companyName");
          }}
          placeholder={intl.formatMessage({
            id: "label.company_name_placeholder",
          })}
          value={companyName}
        />
        <CustomTextInput
          errorMessage={errors.entity}
          isDropdown
          isError={!!errors.entity}
          isMandatory
          label={intl.formatMessage({ id: "label.entity" })}
          onChangeValue={(val) => handleInputChange(val, "entity")}
          options={ENTITY_OPTIONS}
          placeholder={intl.formatMessage({
            id: "label.select_entity_placeholder",
          })}
          value={entity}
        />
        {entity === FIRM_OF_CHARTERED_ACCOUNTANTS && (
          <View style={style.inputContainer}>
            <View style={style.registrationInput}>
              <CustomTextInput
                customHandleBlur={() => handleBlur("registrationNo")}
                errorMessage={errors.registrationNo}
                fieldRef={firmRegistrationRef}
                isError={!!errors.registrationNo}
                isMandatory
                label={intl.formatMessage({
                  id: "label.firm_registration_no",
                })}
                maxLength={FIRM_REGISTRATION_NO_LENGTH}
                onChangeText={(val) =>
                  alphaNumericValidator(val) &&
                  handleInputChange(val, "registrationNo")
                }
                placeholder={intl.formatMessage({
                  id: "label.enter_firm_no",
                })}
                value={registrationNo}
              />
            </View>
            <View style={style.partnerInput}>
              <CustomTextInput
                customHandleBlur={() => handleBlur("noOfPartners")}
                errorMessage={errors.noOfPartners}
                fieldRef={noOfPartnersRef}
                isError={!!errors.noOfPartners}
                isMandatory
                isNumeric
                label={intl.formatMessage({
                  id: "label.no_of_partners",
                })}
                maxLength={NUMBER_OF_PARTNERS_LENGTH}
                onChangeText={(val) =>
                  numericValidator(val) &&
                  handleInputChange(val, "noOfPartners")
                }
                placeholder={intl.formatMessage({
                  id: "label.no_placeholder",
                })}
                value={noOfPartners}
              />
            </View>
          </View>
        )}
        <CustomTextInput
          inputKey="id"
          isDropdown
          isMandatory
          label={intl.formatMessage({ id: "label.current_industry" })}
          labelField="name"
          onChangeValue={(val) => handleInputChange(val, "currentIndustry")}
          options={industryOptions || []}
          placeholder={intl.formatMessage({
            id: "label.select_current_indusrty_placeholder",
          })}
          value={currentIndustry}
          valueField="id"
        />
        <CustomTextInput
          customHandleBlur={() => handleBlur("address")}
          errorMessage={errors.address}
          fieldRef={addressRef}
          isError={!!errors.address}
          isMandatory
          isMultiline
          label={intl.formatMessage({
            id: "label.address_for_correspondence",
          })}
          maxLength={ADDRESS_MAX_LENGTH}
          onChangeText={(val) => handleInputChange(val, "address")}
          placeholder={intl.formatMessage({
            id: "label.address_for_correspondance_placeholder",
          })}
          value={address}
        />
        <CustomTextInput
          inputKey="state_code"
          isDropdown
          isMandatory
          label={intl.formatMessage({ id: "label.state" })}
          labelField="name"
          onChangeValue={(val) => handleInputChange(val, "state")}
          options={stateOptions || []}
          placeholder={intl.formatMessage({
            id: "label.select_state",
          })}
          value={state}
          valueField="state_code"
        />
        <CustomTextInput
          customHandleBlur={() => handleBlur("emailId")}
          errorMessage={errors.emailId}
          fieldRef={emailIdRef}
          isError={!!errors.emailId}
          isMandatory
          label={intl.formatMessage({ id: "label.email_id" })}
          onChangeText={(val) => handleInputChange(val, "emailId")}
          placeholder={intl.formatMessage({
            id: "label.email_id_placeholder",
          })}
          value={emailId}
        />
        <View style={style.inputContainer}>
          <View style={style.codeInput}>
            <CustomTextInput
              customHandleBlur={() => handleBlur("code")}
              errorMessage={errors.code}
              fieldRef={codeRef}
              isError={!!errors.code}
              isMandatory
              isNumeric
              label={intl.formatMessage({
                id: "label.isd_std_code",
              })}
              maxLength={4}
              onChangeText={(val) =>
                numericValidator(val) && handleInputChange(val, "code")
              }
              placeholder={intl.formatMessage({
                id: "label.code_placeholder",
              })}
              value={code}
            />
          </View>
          <View style={style.noInput}>
            <CustomTextInput
              customHandleBlur={() => handleBlur("telephoneNo")}
              errorMessage={errors.telephoneNo}
              fieldRef={telephoneNoRef}
              isError={!!errors.telephoneNo}
              isMandatory
              isNumeric
              label={intl.formatMessage({
                id: "label.telephone_no",
              })}
              maxLength={NUMBER_MAX_LENGTH}
              onChangeText={(val) =>
                numericValidator(val) && handleInputChange(val, "telephoneNo")
              }
              placeholder={intl.formatMessage({
                id: "label.enter_telephone_no",
              })}
              value={telephoneNo}
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

  const isLoadingAPIs = isGettingIndustries || isGettingStates;

  return (
    <>
      {isLoadingAPIs && <LoadingScreen />}
      {!isLoadingAPIs &&
        !!industryOptions?.length &&
        !!stateOptions?.length &&
        !isErrorGettingStates &&
        !isErrorGettingIndustries && (
          <FormWrapper
            onSubmit={onClickNext}
            customFormStyle={commonStyles.mainView}
          >
            <View
              style={
                isWebView
                  ? getResponsiveStyles({
                      str: "signupContainer",
                      currentBreakpoint,
                      theme,
                    })
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
                <KeyboardAwareScrollView
                  keyboardShouldPersistTaps="handled"
                  extraScrollHeight={-50}
                  showsVerticalScrollIndicator={false}
                  style={style.contentContainerStyle}
                >
                  {renderFormContent()}
                </KeyboardAwareScrollView>
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
        )}
      {!isLoadingAPIs && !!getErrorDetails().errorMessage && (
        <ErrorComponent
          errorMsg={getErrorDetails().errorMessage}
          onRetry={getErrorDetails().onRetry}
          disableRetryBtn={isLoadingAPIs}
        />
      )}
    </>
  );
};

SignUpSecondScreenUI.defaultProps = {
  handleDismissToast: () => {},
  industryOptions: [],
  stateOptions: [],
  validationError: "",
};

SignUpSecondScreenUI.propTypes = {
  addressRef: PropTypes.any,
  allFieldsFilled: PropTypes.func.isRequired,
  codeRef: PropTypes.any,
  companyNameRef: PropTypes.any,
  errors: PropTypes.object.isRequired,
  emailIdRef: PropTypes.any,
  formData: PropTypes.object.isRequired,
  firmRegistrationRef: PropTypes.any,
  getErrorDetails: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleDismissToast: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  industryOptions: PropTypes.array,
  intl: PropTypes.object.isRequired,
  isErrorGettingStates: PropTypes.bool.isRequired,
  isErrorGettingIndustries: PropTypes.bool.isRequired,
  isGettingIndustries: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isGettingStates: PropTypes.bool.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  stateOptions: PropTypes.array,
  validationError: PropTypes.string,
};

export default SignUpSecondScreenUI;
