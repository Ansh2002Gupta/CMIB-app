import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  View,
  ScrollView,
} from "@unthinkable/react-core-components";

import ButtonComponent from "../../components/ButtonComponent";
import CommonText from "../../components/CommonText";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomTextInput from "../../components/CustomTextInput";
import FollowUsIcons from "../../components/FollowUsIcons";
import HeaderText from "../../components/HeaderText/HeaderText";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import WebViewLoginSignUpWrapper from "../../components/WebViewLoginSignUpWrapper/WebViewLoginSignUpWrapper";
import styles from "./Loginscreen.style";

const LoginScreenUI = (props) => {
  const {
    active,
    errorMessage,
    errorWhileLoggingIn,
    handleDismissToast,
    intl,
    isLoading,
    loginDisabled,
    onChangePassword,
    onChangeUsername,
    onForgotPasswordClick,
    onLogin,
    onSignUpClick,
    password,
    toggleUser,
    userName,
  } = props;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";
  const width1800pxOrLess = currentBreakpoint !== "xxl";
  const width900pxOrLess =
    currentBreakpoint === "xs" || currentBreakpoint === "sm";

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "label.cmib": {
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
      case "label.cmibText": {
        if (width900pxOrLess) {
          return {
            ...styles.webView.subHeadingText,
            ...styles.webView.subHeadingText900px,
          };
        }
        return styles.webView.subHeadingText;
      }
      default: {
        return {};
      }
    }
  };

  return (
    <WebViewLoginSignUpWrapper shouldApplyStyles={isWebView}>
      <View
        style={{
          ...styles.mainView,
          ...(isWebView && styles.gapForWebView),
        }}
      >
        <View style={styles.container}>
          <HeaderText
            text={intl.formatMessage({ id: "label.login_to_cmib" })}
            label={intl.formatMessage({ id: "label.secure_login_access" })}
            customTextStyle={isWebView ? getResponsiveStyles("label.cmib") : {}}
            customSecondHeadingStyles={
              isWebView && styles.webView.subHeadingText
            }
            customContainerStyles={isWebView && styles.webView.headerContainer}
          />
          <View
            style={{
              ...styles.buttonView,
              ...(isWebView && styles.webView.extraMargin),
            }}
          >
            <CustomTouchableOpacity
              style={styles.topTabs}
              onPress={() => toggleUser(false)}
            >
              <CommonText
                customTextStyle={{
                  ...styles.topTabsText,
                  ...(!active
                    ? styles.webView.selectedSectionHeading
                    : styles.webView.unSelectedSectionHeading),
                }}
                title={intl.formatMessage({ id: "label.member_candidate" })}
              />

              <View
                style={
                  active
                    ? styles.inActiveStyle
                    : {
                        ...styles.activeStyle,
                        ...(isWebView && styles.webView.activeTab),
                      }
                }
              />
            </CustomTouchableOpacity>
            <CustomTouchableOpacity
              style={styles.topTabs}
              onPress={() => toggleUser(true)}
            >
              <View>
                <CommonText
                  customTextStyle={{
                    ...styles.topTabsText,
                    ...(active
                      ? styles.webView.selectedSectionHeading
                      : styles.webView.unSelectedSectionHeading),
                  }}
                  title={intl.formatMessage({ id: "label.company" })}
                />
              </View>
              <View
                style={
                  !active
                    ? styles.inActiveStyle
                    : {
                        ...styles.activeStyle,
                        ...(isWebView && styles.webView.activeTab),
                      }
                }
              />
            </CustomTouchableOpacity>
          </View>
          <View
            style={{
              ...styles.borderStyle,
              ...(isWebView && styles.webView.tabsBottomGreyLine),
            }}
          />
        </View>
        {active ? (
          <ScrollView
            contentContainerStyle={{
              ...styles.companyView,
              ...(isWebView && styles.webView.backGroundColor),
            }}
          >
            <View
              style={{
                ...(isWebView && styles.webView.backGroundColor),
              }}
            >
              <View
                style={{
                  ...(isWebView && styles.webView.backGroundColor),
                }}
              >
                <CustomTextInput
                  label={intl.formatMessage({ id: "label.username" })}
                  placeholder={intl.formatMessage({
                    id: "label.email_id_placeholder",
                  })}
                  value={userName}
                  onChangeText={(val) => onChangeUsername(val)}
                  errorMessage={errorMessage}
                  isError={!!errorMessage}
                  isMandatory
                  customLabelStyle={isWebView && styles.webView.inputLabelText}
                  customTextInputContainer={
                    isWebView && styles.webView.inputTextBox
                  }
                />
                <CustomTextInput
                  label={intl.formatMessage({ id: "label.password" })}
                  placeholder={intl.formatMessage({
                    id: "label.password_placeholder",
                  })}
                  value={password}
                  onChangeText={(val) => onChangePassword(val)}
                  isMandatory
                  eyeImage={true}
                  isPassword={true}
                  customLabelStyle={isWebView && styles.webView.inputLabelText}
                  customTextInputContainer={
                    isWebView && styles.webView.inputTextBox
                  }
                />
                <CustomTouchableOpacity
                  onPress={onForgotPasswordClick}
                  style={styles.forgotPasswordView}
                >
                  <CommonText
                    customTextStyle={{
                      ...styles.forgotPasswordText,
                      ...(isWebView && styles.webView.forgotPasswordText),
                    }}
                    title={intl.formatMessage({
                      id: "label.forgot_password",
                    })}
                  />
                </CustomTouchableOpacity>
                <View style={styles.loginButtonView}>
                  <ButtonComponent
                    title={intl.formatMessage({ id: "label.login" })}
                    onPress={onLogin}
                    disabled={loginDisabled}
                    displayLoader={isLoading}
                    customTitleStyle={isWebView && styles.webView.loginText}
                  />
                </View>
              </View>
              <View style={styles.accountView}>
                <CommonText
                  customTextStyle={{
                    ...styles.accountText,
                    ...(isWebView && styles.webView.dontHaveAccountText),
                  }}
                  title={intl.formatMessage({ id: "label.dont_have_account" })}
                />
                <CustomTouchableOpacity onPress={onSignUpClick}>
                  <CommonText
                    customTextStyle={{
                      ...styles.newAccountText,
                      ...(isWebView && styles.webView.createNewAccountText),
                    }}
                    title={intl.formatMessage({
                      id: "label.create_new_account",
                    })}
                  />
                </CustomTouchableOpacity>
              </View>
            </View>
            {!isWebView && (
              <View style={styles.followUsImageView}>
                <FollowUsIcons />
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.minHeight}></View>
        )}
      </View>
      {!!errorWhileLoggingIn && (
        <ToastComponent
          toastMessage={errorWhileLoggingIn}
          onDismiss={handleDismissToast}
        />
      )}
    </WebViewLoginSignUpWrapper>
  );
};

LoginScreenUI.defaultProps = {
  errorMessage: "",
  errorWhileLoggingIn: "",
  handleDismissToast: () => {},
};

LoginScreenUI.propTypes = {
  active: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  errorWhileLoggingIn: PropTypes.string,
  handleDismissToast: PropTypes.func,
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loginDisabled: PropTypes.bool.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
  onForgotPasswordClick: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  options: PropTypes.array,
  password: PropTypes.string.isRequired,
  toggleUser: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default LoginScreenUI;
