//TODO: Add the current Login code here. Currently these files are just for reference
import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import ButtonComponent from "../../components/ButtonComponent";
import CheckBox from "../../components/CheckBox/CheckBox";
import CommonText from "../../components/CommonText";
import CustomTextInput from "../../components/CustomTextInput";
import HeaderText from "../../components/HeaderText/HeaderText";
import FollowUsIcons from "../../components/FollowUsIcons";
import WebViewLoginSignUpWrapper from "../../components/WebViewLoginSignUpWrapper/WebViewLoginSignUpWrapper";
import useLoginForm from "./controllers/useLoginForm";
import { getResponsiveStyles, styles } from "./LoginFormContainer.style";

const LoginFormContainer = () => {
  const {
    active,
    errorMessage,
    loginDisabled,
    isLoading,
    errorWhileLoggingIn,
    handleToggle,
    onForgotPasswordClick,
    onCreateNewPasswordClick,
    toggleUser,
    onLogin,
    onChangePassword,
    onChangeUsername,
    options,
    password,
    userName,
  } = useLoginForm();

  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const intl = useIntl();

  const isWebView = currentBreakpoint !== "xs";

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
            customTextStyle={
              isWebView
                ? getResponsiveStyles({ str: "label.cmib", currentBreakpoint })
                : {}
            }
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
            <TouchableOpacity
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
            </TouchableOpacity>
            <TouchableOpacity
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
            </TouchableOpacity>
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
                    <CommonText
                      customTextStyle={{
                        ...styles.forgotPasswordText,
                        ...(isWebView && styles.webView.forgotPasswordText),
                      }}
                      title={intl.formatMessage({
                        id: "label.forgot_password",
                      })}
                    />
                  </TouchableOpacity>
                </View>
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
              {errorWhileLoggingIn ? (
                <View style={styles.errorView}>
                  <CommonText
                    customTextStyle={styles.errorText}
                    title={errorWhileLoggingIn}
                  />
                </View>
              ) : null}
              <View style={styles.accountView}>
                <CommonText
                  customTextStyle={{
                    ...styles.accountText,
                    ...(isWebView && styles.webView.dontHaveAccountText),
                  }}
                  title={intl.formatMessage({
                    id: "label.dont_have_account",
                  })}
                />
                <TouchableOpacity onPress={onCreateNewPasswordClick}>
                  <CommonText
                    customTextStyle={{
                      ...styles.newAccountText,
                      ...(isWebView && styles.webView.createNewAccountText),
                    }}
                    title={intl.formatMessage({
                      id: "label.create_new_account",
                    })}
                  />
                </TouchableOpacity>
              </View>
              {!isWebView && (
                <View style={styles.followUsImageView}>
                  <FollowUsIcons />
                </View>
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.minHeight}></View>
        )}
      </View>
    </WebViewLoginSignUpWrapper>
  );
};

export default LoginFormContainer;
