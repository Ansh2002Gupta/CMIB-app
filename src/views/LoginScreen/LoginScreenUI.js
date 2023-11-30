import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import PropTypes from "prop-types";
import HeaderText from "../../components/HeaderText/HeaderText";
import WebViewLoginSignUpWrapper from "../../components/WebViewLoginSignUpWrapper/WebViewLoginSignUpWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import ButtonComponent from "../../components/ButtonComponent";
import FollowUsIcons from "../../components/FollowUsIcons";
import CheckBox from "../../components/CheckBox/CheckBox";
import { MediaQueryContext } from "@unthinkable/react-theme";
import styles from "./Loginscreen.style";

const LoginScreenUI = (props) => {
  const {
    onLogin,
    active,
    onForgotPasswordClick,
    toggleUser,
    loginDisabled,
    errorMessage,
    userName,
    password,
    onChangeUsername,
    onChangePassword,
    intl,
    onCreateNewPasswordClick,
    options,
    handleToggle,
  } = props;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView =
    currentBreakpoint === "sm" ||
    currentBreakpoint === "md" ||
    currentBreakpoint === "lg" ||
    currentBreakpoint === "xl" ||
    currentBreakpoint === "xxl";
  const width1800pxOrLess = currentBreakpoint === "xxl";
  const width900pxOrLess = currentBreakpoint === "md" || currentBreakpoint === "sm";

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
          ...(isWebView ? styles.gapForWebView : {}),
        }}
      >
        <View style={styles.container}>
          <HeaderText
            text={intl.formatMessage({ id: "label.login_to_cmib" })}
            label={intl.formatMessage({ id: "label.secure_login_access" })}
            customTextStyle={isWebView ? getResponsiveStyles("label.cmib") : {}}
            customContainerStyles={
              isWebView ? styles.webView.headerContainer : {}
            }
          />
          <View
            style={{
              ...styles.buttonView,
              ...(isWebView ? styles.webView.extraMargin : {}),
            }}
          >
            <TouchableOpacity
              style={styles.topTabs}
              onPress={() => toggleUser(false)}
            >
              <Text
                style={{
                  ...styles.topTabsText,
                  ...(!active
                    ? styles.webView.selectedSectionHeading
                    : styles.webView.unSelectedSectionHeading),
                }}
              >
                {intl.formatMessage({ id: "label.member_candidate" })}
              </Text>
              <View
                style={
                  active
                    ? styles.inActiveStyle
                    : {
                        ...styles.activeStyle,
                        ...(isWebView ? styles.webView.activeTab : {}),
                      }
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topTabs}
              onPress={() => toggleUser(true)}
            >
              <View>
                <Text
                  style={{
                    ...styles.topTabsText,
                    ...(active
                      ? styles.webView.selectedSectionHeading
                      : styles.webView.unSelectedSectionHeading),
                  }}
                >
                  {intl.formatMessage({ id: "label.company" })}
                </Text>
              </View>
              <View
                style={
                  !active
                    ? styles.inActiveStyle
                    : {
                        ...styles.activeStyle,
                        ...(isWebView ? styles.webView.activeTab : {}),
                      }
                }
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.borderStyle,
              ...(isWebView ? styles.webView.tabsBottomGreyLine : {}),
            }}
          />
        </View>
        {active ? (
          <>
            <View
              style={{
                ...styles.companyView,
                ...(isWebView ? styles.webView.backGroundColor : {}),
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
                customLabelStyle={
                  isWebView ? styles.webView.inputLabelText : {}
                }
                customTextInputContainer={
                  isWebView ? styles.webView.inputTextBox : {}
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
                customLabelStyle={
                  isWebView ? styles.webView.inputLabelText : {}
                }
                customTextInputContainer={
                  isWebView ? styles.webView.inputTextBox : {}
                }
              />
              <View style={styles.forgotPasswordView}>
                <View style={{ flexDirection: "row" }}>
                  <CheckBox
                    title="Remember Me"
                    isSelected={options[0].isSelected}
                    handleCheckbox={handleToggle}
                    id={options[0].id}
                  />
                </View>
                <TouchableOpacity onPress={onForgotPasswordClick}>
                  <Text
                    style={{
                      ...styles.forgotPasswordText,
                      ...(isWebView ? styles.webView.forgotPasswordText : {}),
                    }}
                  >
                    {intl.formatMessage({ id: "label.forgot_password" })}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.loginButtonView}>
                <ButtonComponent
                  title={intl.formatMessage({ id: "label.login" })}
                  onPress={onLogin}
                  disabled={loginDisabled}
                  customTitleStyle={isWebView ? styles.webView.loginText : {}}
                />
              </View>
              <View style={styles.accountView}>
                <Text
                  style={{
                    ...styles.accountText,
                    ...(isWebView ? styles.webView.dontHaveAccountText : {}),
                  }}
                >
                  {intl.formatMessage({ id: "label.dont_have_account" })}
                </Text>
                <TouchableOpacity onPress={onCreateNewPasswordClick}>
                  <Text
                    style={{
                      ...styles.newAccountText,
                      ...(isWebView ? styles.webView.createNewAccountText : {}),
                    }}
                  >
                    {intl.formatMessage({ id: "label.create_new_account" })}
                  </Text>
                </TouchableOpacity>
              </View>
              {!isWebView && (
                <View style={styles.followUsImageView}>
                  <FollowUsIcons />
                </View>
              )}
            </View>
          </>
        ) : (
          <View style={styles.minHeight}></View>
        )}
      </View>
    </WebViewLoginSignUpWrapper>
  );
};

LoginScreenUI.propTypes = {
  onLogin: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  onForgotPasswordClick: PropTypes.func.isRequired,
  toggleUser: PropTypes.func.isRequired,
  loginDisabled: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  onCreateNewPasswordClick: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default LoginScreenUI;
