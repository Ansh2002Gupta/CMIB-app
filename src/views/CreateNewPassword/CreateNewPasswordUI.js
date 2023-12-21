import React, { useContext, useEffect, useState } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { ScrollView,TouchableOpacity,View } from "@unthinkable/react-core-components";

import CreateNewPasswordValidation from "./CreateNewPasswordValidation";
import ButtonComponent from "../../components/ButtonComponent";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CustomTextInput from "../../components/CustomTextInput";
import HeaderTextWithLabelAndDescription from "../../components/HeaderTextWithLabelAndDescription/HeaderTextWithLabelAndDescription";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import WebViewLoginSignUpWrapper from "../../components/WebViewLoginSignUpWrapper/WebViewLoginSignUpWrapper";
import styles from "./CreateNewPassword.style";

function CreateNewPasswordUI(props) {
  const {
    confirmNewPassword,
    errorMessage,
    handleSubmit,
    handleDismissToast,
    intl,
    isLoading,
    newPassword,
    onClickGoToLogin,
    onChangePasswordInput,
    onChangeConfirmPasswordInput,
    successLogin,
    successMsg,
    validationError,
  } = props;

  const [isAnyPasswordFieldLeft, setIsAnyPasswordFieldLeft] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    numeric: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
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
            <HeaderTextWithLabelAndDescription
              headerText={intl.formatMessage({ id: "label.create_new_password" })}
              description={intl.formatMessage({ id: "label.enter_new_password" })}
              customTextStyle={isWebView ? {...styles.headerText, ...getResponsiveStyles("label.createNewPassword")} : styles.headerText}
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
              eyeImage={true}
              isPassword={true}
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
              isMandatory
              eyeImage={true}
              isPassword={true}
              customLabelStyle={isWebView ? styles.webView.inputLabelText : {}}
              customTextInputContainer={
                isWebView ? styles.webView.inputTextBox : {}
              }
              errorMessage={errorMessage}
              isError={!!errorMessage}
            />
            <CreateNewPasswordValidation
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
            {isAnyPasswordFieldLeft && (
              <View style={styles.passwordFieldsErrorContainer}>
                <CommonText
                  customTextStyle={styles.passwordFieldsErrorText}
                  title={intl.formatMessage({ id: "label.password_field_error" })}
                />
              </View>
            )}
          </View>
          <View style={styles.submitView}>
            <ButtonComponent
              title={intl.formatMessage({ id: "label.submit" })}
              onPress={() => {
                areAllFieldFilledInPassword();
                if(isAnyPasswordFieldLeft)
                handleSubmit();
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
          {!!validationError && (
            <ToastComponent
              toastMessage={validationError}
              onDismiss={handleDismissToast}
            />
          )}
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
      </WebViewLoginSignUpWrapper>
    </ScrollView>
  );
}

export default CreateNewPasswordUI;
