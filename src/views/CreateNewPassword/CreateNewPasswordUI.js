import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomModal from "../../components/CustomModal";
import CustomTextInput from "../../components/CustomTextInput";
import HeaderTextWithLabelAndDescription from "../../components/HeaderTextWithLabelAndDescription";
import NewPasswordValidation from "../../components/NewPasswordValidation";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import WebViewLoginSignUpWrapper from "../../components/WebViewLoginSignUpWrapper/WebViewLoginSignUpWrapper";
import {
  onConfirmPasswordBlur,
  strongPasswordValidator,
} from "../../utils/validation";
import getStyles from "./CreateNewPassword.style";

function CreateNewPasswordUI(props) {
  const {
    confirmNewPassword,
    errorMessage,
    handleSubmit,
    intl,
    isLoading,
    newPassword,
    onClickGoToLogin,
    onChangePasswordInput,
    onChangeConfirmPasswordInput,
    successLogin,
    setErrorWhileResetPassword,
    setError,
    validationError,
  } = props;

  const theme = useTheme();
  const styles = getStyles(theme);

  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";
  const width1800pxOrLess = currentBreakpoint !== "xxl";
  const width900pxOrLess =
    currentBreakpoint === "md" || currentBreakpoint === "sm";
  const [toastMessage, setToastMessage] = useState("");
  const isPasswordStrong = strongPasswordValidator(newPassword);

  const handleDismissToast = () => {
    setErrorWhileResetPassword("");
    setToastMessage("");
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

  const handleSubmitClick = () => {
    let message = "";
    if (!strongPasswordValidator(newPassword)) {
      message = intl.formatMessage({
        id: "label.password_field_error",
      });
    } else if (newPassword !== confirmNewPassword) {
      message = intl.formatMessage({ id: "label.password-not-match" });
    }
    if (message) {
      setToastMessage(message);
    } else {
      handleSubmit();
    }
  };

  const customStyle = isWebView
    ? {
        ...styles.webView.inputStyle,
        ...(errorMessage && styles.webView.erroInputStyle),
      }
    : { ...styles.inputStyle, ...(errorMessage && styles.erroInputStyle) };

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
              headerText={intl.formatMessage({
                id: "label.create_new_password",
              })}
              description={intl.formatMessage({
                id: "label.enter_new_password",
              })}
              customTextStyle={
                isWebView
                  ? {
                      ...styles.headerText,
                      ...getResponsiveStyles("label.createNewPassword"),
                    }
                  : styles.headerText
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
                onChangePasswordInput(val);
              }}
              customHandleBlur={() => {
                onConfirmPasswordBlur({
                  confirmNewPassword,
                  newPassword,
                  setError,
                  errorMessage: intl.formatMessage({
                    id: "label.password-not-match",
                  }),
                });
              }}
              eyeImage
              isPassword
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
                onConfirmPasswordBlur({
                  confirmNewPassword,
                  newPassword,
                  setError,
                  errorMessage: intl.formatMessage({
                    id: "label.password-not-match",
                  }),
                });
              }}
              isMandatory
              eyeImage
              isPassword
              customTextInputContainer={
                isWebView ? styles.webView.inputTextBox : {}
              }
              customStyle={customStyle}
              errorMessage={errorMessage}
              isError={!!errorMessage}
              customErrorStyle={styles.ErrorStyle}
            />
            <NewPasswordValidation
              {...{
                newPassword,
                confirmNewPassword,
              }}
              customContainerStyles={
                isWebView
                  ? styles.webView.requirementsPoints(currentBreakpoint)
                  : styles.requirementsPoints
              }
            />
          </View>
          <View style={styles.submitView}>
            <CustomButton
              disabled={
                !newPassword ||
                !confirmNewPassword ||
                newPassword !== confirmNewPassword ||
                !isPasswordStrong
              }
              isLoading={isLoading}
              onPress={handleSubmitClick}
              withGreenBackground
              style={styles.webView.submitTextContainer}
            >
              {intl.formatMessage({ id: "label.submit" })}
            </CustomButton>
            <CustomTouchableOpacity
              onPress={onClickGoToLogin}
              style={styles.backButtonStyle}
            >
              <CommonText
                customTextStyle={styles.backToLoginText}
                fontWeight="600"
              >
                {intl.formatMessage({ id: "label.back_to_login" })}
              </CommonText>
            </CustomTouchableOpacity>
          </View>
          {successLogin && (
            <CustomModal
              headerText={intl.formatMessage({
                id: "label.password_changed_successfully",
              })}
              onPress={() => {
                onClickGoToLogin();
              }}
              buttonTitle={intl.formatMessage({ id: "label.go_back_to_login" })}
              isSuccess
              maxWidth={"xs"}
            />
          )}
        </View>
        {(!!validationError || toastMessage !== "") && (
          <ToastComponent
            toastMessage={validationError || toastMessage}
            onDismiss={handleDismissToast}
          />
        )}
      </WebViewLoginSignUpWrapper>
    </ScrollView>
  );
}

CreateNewPasswordUI.defaultProps = {
  errorMessage: "",
  isLoading: false,
  successLogin: false,
  validationError: "",
};

CreateNewPasswordUI.propTypes = {
  confirmNewPassword: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  intl: PropTypes.object.isRequired,
  newPassword: PropTypes.string.isRequired,
  onClickGoToLogin: PropTypes.func.isRequired,
  onChangePasswordInput: PropTypes.func.isRequired,
  onChangeConfirmPasswordInput: PropTypes.func.isRequired,
  successLogin: PropTypes.bool,
  setErrorWhileResetPassword: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  validationError: PropTypes.string,
};

export default CreateNewPasswordUI;
