import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../../../components/ActionPairButton";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import FormWrapper from "../../../components/FormWrapper";
import HeaderTextWithLabelAndDescription from "../../../components/HeaderTextWithLabelAndDescription";
import KeyboardAwareScrollView from "../../../components/KeyboardAwareScrollView";
import LabelWithLinkText from "../../../components/LabelWithLinkText";
import LoadingScreen from "../../../components/LoadingScreen";
import MobileNumberInput from "../../../components/MobileNumberInput";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../../hooks/useIsWebView";
import images from "../../../images";
import {
  CAREER_ASCENTS,
  CA_JOBS,
  DEFAULT_INPUT_MAX_LENGTH,
  NEWLY_QUALIFIED,
  OVERSEAS_PLACEMENTS,
  SALUTATION_OPTIONS,
  WOMENT_PLACEMENT,
} from "../../../constants/constants";
import { numericValidator } from "../../../utils/validation";
import commonStyles from "../../../theme/styles/commonStyles";
import { getResponsiveStyles, style } from "./SignUpThirdScreen.style";

const SignUpThirdScreenUI = ({
  allFieldsFilled,
  contactDetails,
  countryCodeResult,
  errors,
  getAppropriateRef,
  getErrorDetails,
  handleBlur,
  handleDismissToast,
  handleInputChange,
  isErrorCountryCodes,
  isGettingCountryCodes,
  intl,
  isLoading,
  onClickGoToLogin,
  onClickNext,
  onGoBack,
  validationError,
}) => {
  const isWeb = Platform.OS === "web";
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const showContentHeader =
    currentBreakpoint !== "xs" && currentBreakpoint !== "sm";

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

  const renderFormContent = () => {
    return (
      <View style={style.formContainer}>
        {contactDetails.map((detail, index) => (
          <View key={String(index)}>
            <CommonText fontWeight="600" customTextStyle={style.headerText}>
              {getHeaderText(detail.module, intl)}
            </CommonText>
            <View style={style.inputContainer}>
              <View style={style.firstInput}>
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
              </View>
              <View style={style.secondInput}>
                <CustomTextInput
                  label={intl.formatMessage({
                    id: "label.contact_person_name",
                  })}
                  placeholder={intl.formatMessage({
                    id: "label.enter_contact_person_name",
                  })}
                  maxLength={DEFAULT_INPUT_MAX_LENGTH}
                  customHandleBlur={() => handleBlur("name", index)}
                  value={contactDetails[index].name}
                  errorMessage={errors[index].name}
                  isError={!!errors[index].name}
                  onChangeText={(val) => handleInputChange(val, "name", index)}
                  isMandatory
                  fieldRef={getAppropriateRef(detail.module, "name")}
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
              customHandleBlur={() => handleBlur("designation", index)}
              errorMessage={errors[index].designation}
              isError={!!errors[index].designation}
              value={contactDetails[index].designation}
              onChangeText={(val) =>
                handleInputChange(val, "designation", index)
              }
              maxLength={DEFAULT_INPUT_MAX_LENGTH}
              isMandatory
              fieldRef={getAppropriateRef(detail.module, "designation")}
            />
            <MobileNumberInput
              codeError={errors[index].countryCode}
              codeValue={contactDetails[index].countryCode}
              customHandleBlur={() => handleBlur("mobileNo", index)}
              onChangeCode={(val) =>
                handleInputChange(val, "countryCode", index)
              }
              onChangeMobNumber={(val) =>
                numericValidator(val) &&
                handleInputChange(val, "mobileNo", index)
              }
              options={countryCodeResult}
              mobNumberValue={contactDetails[index].mobileNo}
              mobNumberError={errors[index].mobileNo}
              fieldRef={getAppropriateRef(detail.module, "mobileNo")}
            />
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.email_id",
              })}
              placeholder={intl.formatMessage({
                id: "label.enter_contact_person_email_id",
              })}
              customHandleBlur={() => handleBlur("emailId", index)}
              errorMessage={errors[index].emailId}
              isError={!!errors[index].emailId}
              value={contactDetails[index].emailId}
              onChangeText={(val) => handleInputChange(val, "emailId", index)}
              isMandatory
              fieldRef={getAppropriateRef(detail.module, "emailId")}
            />
            {index < contactDetails.length - 1 && contactDetails.length > 1 && (
              <View style={style.dividerStyle} />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderFooterContent = () => {
    return (
      <View style={isWeb && style.webSignupFooter}>
        <ActionPairButton
          buttonOneText={intl.formatMessage({ id: "label.back" })}
          buttonTwoText={intl.formatMessage({ id: "label.next" })}
          customStyles={{
            customContainerStyle: !isWebView
              ? { ...style.buttonContainer }
              : {},
          }}
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
    <>
      {isGettingCountryCodes && <LoadingScreen />}
      {!isGettingCountryCodes &&
        !!countryCodeResult?.length &&
        !isErrorCountryCodes && (
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
                    })
                  : style.innerContainer
              }
            >
              {isWebView && (
                <View>
                  <HeaderTextWithLabelAndDescription
                    label={intl.formatMessage({ id: "label.step_three" })}
                    {...(showContentHeader && {
                      headerText: intl.formatMessage({
                        id: "label.contact_person_details",
                      }),
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
                  <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    extraScrollHeight={-50}
                    showsVerticalScrollIndicator={false}
                    style={style.contentContainerStyle}
                  >
                    {renderFormContent()}
                  </KeyboardAwareScrollView>
                  {renderFooterContent()}
                </>
              )}
              {!!validationError && (
                <ToastComponent
                  toastMessage={validationError}
                  onDismiss={handleDismissToast}
                />
              )}
            </View>
          </FormWrapper>
        )}
      {!isGettingCountryCodes && !!getErrorDetails().errorMessage && (
        <ErrorComponent
          errorMsg={getErrorDetails().errorMessage}
          onRetry={getErrorDetails().onRetry}
          disableRetryBtn={isGettingCountryCodes}
        />
      )}
    </>
  );
};

SignUpThirdScreenUI.defaultProps = {
  errors: {},
  handleDismissToast: () => {},
  onClickGoToLogin: () => {},
  validationError: "",
};

SignUpThirdScreenUI.propTypes = {
  allFieldsFilled: PropTypes.func.isRequired,
  contactDetails: PropTypes.array.isRequired,
  countryCodeResult: PropTypes.array,
  errors: PropTypes.array,
  getAppropriateRef: PropTypes.func.isRequired,
  getErrorDetails: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleDismissToast: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isErrorCountryCodes: PropTypes.bool.isRequired,
  isGettingCountryCodes: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClickGoToLogin: PropTypes.func,
  onClickNext: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  validationError: PropTypes.string,
};

export default SignUpThirdScreenUI;
