import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import CustomTextInput from "../../components/CustomTextInput";
import styles from "./CreateNewPassword.style";
import HeaderText from "../../components/HeaderText/HeaderText";
import ButtonComponent from "../../components/ButtonComponent";
import CreateNewPasswordValidation from "../../components/CreateNewPasswordValidation";
import { MediaQueryContext } from "@unthinkable/react-theme";
import WebViewLoginSignUpWrapper from "../../components/WebViewLoginSignUpWrapper/WebViewLoginSignUpWrapper";

function CreateNewPasswordUI(props) {
  const {
    handleSubmit,
    onClickGoToLogin,
    onChangePasswordInput,
    confirmNewPassword,
    newPassword,
    onChangeConfirmPasswordInput,
    error,
    intl,
  } = props;
  const [isAnyPasswordFieldLeft, setIsAnyPasswordFieldLeft] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    numeric: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    match: false,
  });
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView =
    currentBreakpoint === "sm" ||
    currentBreakpoint === "md" ||
    currentBreakpoint === "lg" ||
    currentBreakpoint === "xl" ||
    currentBreakpoint === "xxl";
  const width1800pxOrLess = currentBreakpoint === "xxl";
  const width900pxOrLess = currentBreakpoint === "md" || currentBreakpoint === "sm";

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
              <Text style={styles.passwordFieldsErrorText}>
                Please provide all the necessary fields for the password.
              </Text>
            </View>
          )}
        </View>
        <View style={styles.submitView}>
          <ButtonComponent
            title={intl.formatMessage({ id: "label.submit" })}
            onPress={() => {
              areAllFieldFilledInPassword();
              // handleSubmit();
            }}
            customTitleStyle={styles.webView.submitText}
            customButtonContainer={styles.webView.submitTextContainer}
          />
          <TouchableOpacity onPress={onClickGoToLogin}>
            <Text
              style={{
                ...styles.backToLoginText,
                ...(isWebView ? styles.webView.backBtnText : {}),
              }}
            >
              {intl.formatMessage({ id: "label.back_to_login" })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </WebViewLoginSignUpWrapper>
  );
}

export default CreateNewPasswordUI;
