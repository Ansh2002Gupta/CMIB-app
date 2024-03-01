import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../../../components/ActionPairButton";
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
  DEFAULT_INPUT_MAX_LENGTH,
  SALUTATION_OPTIONS,
} from "../../../constants/constants";
import { numericValidator } from "../../../utils/validation";
import commonStyles from "../../../theme/styles/commonStyles";
import { getResponsiveStyles, style } from "./SignUpThirdScreen.style";
import CardComponent from "../../../components/CardComponent";
import CustomButton from "../../../components/CustomButton";

const SignUpThirdScreenUI = ({
  allFieldsFilled,
  contactDetails,
  countryCodeResult,
  errors,
  getAppropriateRef,
  getErrorDetails,
  handleAddContactPerson,
  handleBlur,
  handleDismissToast,
  handleInputChange,
  handleRemoveContactPerson,
  isErrorCountryCodes,
  isGettingCountryCodes,
  intl,
  isLoading,
  moduleList,
  onClickGoToLogin,
  onClickNext,
  onGoBack,
  onDeleteSelectedItem,
  signUpModuleList,
  validationError,
}) => {
  const isWeb = Platform.OS === "web";
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const showContentHeader =
    currentBreakpoint !== "xs" && currentBreakpoint !== "sm";

  const renderFormContent = () => {
    return (
      <View style={style.formContainer}>
        <>
          {contactDetails?.map((detail, index) => (
            <CardComponent
              key={String(index)}
              customStyle={style.contactPersonContainer}
            >
              <CustomTextInput
                label={"Modules"}
                dropdownStyle={style.dropdownStyle}
                placeholder={"Select Modules"}
                errorMessage={errors[index]?.modules}
                isError={!!errors[index]?.modules}
                value={contactDetails[index]?.modules}
                options={moduleList}
                onChangeValue={(val) =>
                  handleInputChange(val, "modules", index)
                }
                onDeleteSelectedItem={(list) =>
                  onDeleteSelectedItem(list, index)
                }
                indexNumber={index}
                labelField="name"
                valueField="value"
                indexField="selectedIndex"
                isDropdown
                isMultiSelect
              />
              <View>
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
                      errorMessage={errors[index]?.salutation}
                      isError={!!errors[index]?.salutation}
                      value={contactDetails[index]?.salutation}
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
                      value={contactDetails[index]?.name}
                      errorMessage={errors[index]?.name}
                      isError={!!errors[index]?.name}
                      onChangeText={(val) =>
                        handleInputChange(val, "name", index)
                      }
                      isMandatory
                      fieldRef={getAppropriateRef(
                        detail.modules?.[index],
                        "name"
                      )}
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
                  errorMessage={errors[index]?.designation}
                  isError={!!errors[index]?.designation}
                  value={contactDetails[index]?.designation}
                  onChangeText={(val) =>
                    handleInputChange(val, "designation", index)
                  }
                  maxLength={DEFAULT_INPUT_MAX_LENGTH}
                  isMandatory
                  fieldRef={getAppropriateRef(
                    detail.modules?.[index],
                    "designation"
                  )}
                />
                <MobileNumberInput
                  codeError={errors[index]?.countryCode}
                  codeValue={contactDetails[index]?.countryCode}
                  customHandleBlur={() => handleBlur("mobileNo", index)}
                  onChangeCode={(val) =>
                    handleInputChange(val, "countryCode", index)
                  }
                  onChangeMobNumber={(val) =>
                    numericValidator(val) &&
                    handleInputChange(val, "mobileNo", index)
                  }
                  options={countryCodeResult}
                  mobNumberValue={contactDetails[index]?.mobileNo}
                  mobNumberError={errors[index]?.mobileNo}
                  fieldRef={getAppropriateRef(
                    detail.modules?.[index],
                    "mobileNo"
                  )}
                />
                <CustomTextInput
                  label={intl.formatMessage({
                    id: "label.email_id",
                  })}
                  placeholder={intl.formatMessage({
                    id: "label.enter_contact_person_email_id",
                  })}
                  customHandleBlur={() => handleBlur("emailId", index)}
                  errorMessage={errors[index]?.emailId}
                  isError={!!errors[index]?.emailId}
                  value={contactDetails[index]?.emailId}
                  onChangeText={(val) =>
                    handleInputChange(val, "emailId", index)
                  }
                  isMandatory
                  fieldRef={getAppropriateRef(
                    detail.modules?.[index],
                    "emailId"
                  )}
                />
                <CustomButton
                  style={style.removeButton}
                  iconLeft={{
                    isLeftIconNotSvg: false,
                    leftIconSource: images.iconDeleteRed,
                  }}
                  onPress={() => handleRemoveContactPerson(index)}
                >
                  {intl.formatMessage({ id: "label.remove" })}
                </CustomButton>
              </View>
            </CardComponent>
          ))}
          {contactDetails.length < signUpModuleList.length && (
            <CustomButton
              iconLeft={{
                isLeftIconNotSvg: false,
                leftIconSource: images.iconAdd,
              }}
              onPress={handleAddContactPerson}
            >
              {intl.formatMessage({ id: "label.addContactPerson" })}
            </CustomButton>
          )}
        </>
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
  contactDetails: [],
  errors: {},
  handleDismissToast: () => {},
  onClickGoToLogin: () => {},
  validationError: "",
};

SignUpThirdScreenUI.propTypes = {
  allFieldsFilled: PropTypes.func.isRequired,
  contactDetails: PropTypes.array,
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
