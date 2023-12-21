import React, { useContext, useEffect, useState } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import ButtonComponent from "../../components/ButtonComponent";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CustomTextInput from "../../components/CustomTextInput";
import HeaderText from "../../components/HeaderText/HeaderText";
import NewPasswordValidation from "../../components/NewPasswordValidation";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import WebViewLoginSignUpWrapper from "../../components/WebViewLoginSignUpWrapper/WebViewLoginSignUpWrapper";
import styles from "./CreateNewPassword.style";

function CreateNewPasswordUI(props) {
  const {
    confirmNewPassword,
    errorMessage,
    handleSubmit,
    handleConfirmPasswordBlur,
    intl,
    isLoading,
    newPassword,
    onClickGoToLogin,
    onChangePasswordInput,
    onChangeConfirmPasswordInput,
    successLogin,
    successMsg,
    setErrorWhileResetPassword,
    validationError,
  } = props;

  const [isAnyPasswordFieldLeft, setIsAnyPasswordFieldLeft] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    lowercase: false,
    numeric: false,
    match: false,
    specialChar: false,
    uppercase: false,
  });

  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";
  const width1800pxOrLess = currentBreakpoint !== "xxl";
  const width900pxOrLess =
    currentBreakpoint === "md" || currentBreakpoint === "sm";

  const areAllFieldFilledInPassword = () => {
    if (
      !validations.length ||
      !validations.numeric ||
      !validations.uppercase ||
      !validations.lowercase ||
      !validations.specialChar
    ) {
      setIsAnyPasswordFieldLeft(true);
      return;
    }
    setIsAnyPasswordFieldLeft(false);
  };

  const handleDismissToast = () => {
    setErrorWhileResetPassword("");
    setIsAnyPasswordFieldLeft(false);
  };

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "label.createNewPassword": {
        if (width900pxOrLess) {
          return {
            ...styles.webView.headerText,
            ...styles.webView.headerText900px,
          };
        }
        if (width1800pxOrLess) {
          return {
            ...styles.webView.headerText,
            ...styles.webView.headerText1800px,
          };
        }
        return styles.webView.headerText;
      }
      case "label.createNewPasswordText": {
        if (width900pxOrLess) {
          return {
            ...styles.webView.headerNameText,
            ...styles.webView.headerNameText900,
          };
        }
        return styles.webView.headerNameText;
      }
      default: {
        return {};
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsAnyPasswordFieldLeft(false);
    };
  }, []);

  console.log(errorMessage, "errorMessage");
  return (
    <ScrollView
      style={styles.mainView}
      contentContainerStyle={styles.scrollViewContainerStyle}
    >
      <WebViewLoginSignUpWrapper shouldApplyStyles={isWebView}>
        <View
          style={{
            ...styles.mainView,
            ...(isWebView ? styles.webView.mainView : {}),
          }}
        >
          <View style={styles.container}>
            <HeaderText
              text={intl.formatMessage({ id: "label.create_new_password" })}
              label={intl.formatMessage({ id: "label.enter_new_password" })}
              customTextStyle={
                isWebView ? getResponsiveStyles("label.createNewPassword") : {}
              }
              customSecondHeadingStyles={
                isWebView
                  ? getResponsiveStyles("label.createNewPasswordText")
                  : {}
              }
              customContainerStyles={
                isWebView ? styles.webView.headerTextContainer : {}
              }
            />
            {!isWebView && <View style={styles.borderStyle} />}
          </View>
          <View
            style={{
              ...styles.companyView,
              ...(isWebView ? styles.webView.companyView : {}),
            }}
          >
            <CustomTextInput
              label={intl.formatMessage({ id: "label.new_password" })}
              isMandatory
              placeholder={intl.formatMessage({
                id: "label.enter_your_new_password",
              })}
              value={newPassword}
              onChangeText={(val) => {
                setIsAnyPasswordFieldLeft(false);
                onChangePasswordInput(val);
              }}
              customHandleBlur={() => {
                handleConfirmPasswordBlur();
              }}
              eyeImage
              isPassword
              customLabelStyle={isWebView ? styles.webView.inputLabelText : {}}
              customTextInputContainer={
                isWebView ? styles.webView.inputTextBox : {}
              }
            />
            <CustomTextInput
              label={intl.formatMessage({ id: "label.confirm_new_password" })}
              placeholder={intl.formatMessage({
                id: "label.confirm_your_new_password",
              })}
              value={confirmNewPassword}
              onChangeText={(val) => {
                onChangeConfirmPasswordInput(val);
              }}
              customHandleBlur={() => {
                handleConfirmPasswordBlur();
              }}
              isMandatory
              eyeImage
              isPassword
              customLabelStyle={isWebView ? styles.webView.inputLabelText : {}}
              customTextInputContainer={
                isWebView ? styles.webView.inputTextBox : {}
              }
              errorMessage={errorMessage}
              isError={!!errorMessage}
              customErrorStyle={styles.ErrorStyle}
            />
            <NewPasswordValidation
              {...{
                newPassword,
                confirmNewPassword,
                setIsAnyPasswordFieldLeft,
                validations,
                setValidations,
              }}
              customContainerStyles={
                isWebView ? styles.webView.requirementsPoints : {}
              }
            />
          </View>
          <View style={styles.submitView}>
            <ButtonComponent
              title={intl.formatMessage({ id: "label.submit" })}
              onPress={() => {
                areAllFieldFilledInPassword();
                if (isAnyPasswordFieldLeft) handleSubmit();
              }}
              customTitleStyle={styles.webView.submitText}
              customButtonContainer={styles.webView.submitTextContainer}
              displayLoader={isLoading}
            />
            <TouchableOpacity onPress={onClickGoToLogin}>
              <CommonText
                customTextStyle={{
                  ...styles.backToLoginText,
                  ...(isWebView ? styles.webView.backBtnText : {}),
                }}
                title={intl.formatMessage({ id: "label.back_to_login" })}
              />
            </TouchableOpacity>
          </View>
          {successLogin && (
            <CustomModal
              headerText={successMsg}
              onPress={() => {
                onClickGoToLogin();
              }}
              buttonTitle={intl.formatMessage({ id: "label.go_back_to_login" })}
              isSuccess
            />
          )}
        </View>
        {(!!validationError || isAnyPasswordFieldLeft) && (
          <ToastComponent
            toastMessage={
              validationError ||
              intl.formatMessage({
                id: "label.password_field_error",
              })
            }
            onDismiss={handleDismissToast}
          />
        )}
      </WebViewLoginSignUpWrapper>
    </ScrollView>
  );
}

export default CreateNewPasswordUI;
