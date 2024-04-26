import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import {
  View,
  TouchableOpacity,
  ScrollView,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import FollowUsIcons from "../../components/FollowUsIcons";
import FormWrapper from "../../components/FormWrapper";
import HeaderTextWithLabelAndDescription from "../../components/HeaderTextWithLabelAndDescription";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import WebViewLoginSignUpWrapper from "../../components/WebViewLoginSignUpWrapper/WebViewLoginSignUpWrapper";
import { USER_TYPE } from "../../constants/constants";
import commonStyles from "../../theme/styles/commonStyles";
import getStyles from "./Loginscreen.style";

const LoginScreenUI = (props) => {
  const {
    active,
    errorMessage,
    errorMessageForMemberLogin,
    errorWhileLoggingIn,
    handleDismissToast,
    intl,
    isLoading,
    loginDisabled,
    logoutDetails,
    onChangePassword,
    onChangeSRNNumber,
    onChangeUsername,
    onCreateNewPasswordClick,
    onForgotPasswordClick,
    onLogin,
    onLoginForMembers,
    password,
    srn,
    toggleUser,
    userName,
  } = props;

  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const theme = useTheme();
  const styles = getStyles(theme);

  const isWebView = currentBreakpoint !== "xs";
  const width1800pxOrLess = currentBreakpoint !== "xxl";
  const width900pxOrLess =
    currentBreakpoint === "xs" || currentBreakpoint === "sm";
  const containerStyle = isWebView
    ? styles.webView.backGroundColor
    : styles.mobViewContainer;

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
    <FormWrapper
      onSubmit={() => {
        !active ? onLoginForMembers() : onLogin();
      }}
      customFormStyle={commonStyles.mainView}
    >
      <WebViewLoginSignUpWrapper
        shouldApplyStyles={isWebView}
        shouldShowFollowUs
      >
        <View
          style={{
            ...commonStyles.mainView,
            ...(isWebView && styles.gapForWebView),
          }}
        >
          <View
            style={{
              ...styles.container,
              ...(!isWebView && styles.mobViewContainer),
            }}
          >
            <HeaderTextWithLabelAndDescription
              headerText={intl.formatMessage({ id: "label.login_to_cmib" })}
              description={intl.formatMessage({
                id: "label.secure_login_access",
              })}
              customTextStyle={
                isWebView
                  ? {
                      ...styles.webView.headerText,
                      ...getResponsiveStyles("label.cmib"),
                    }
                  : styles.loginHeaderText
              }
              customSecondHeadingStyles={
                isWebView ? styles.webView.subHeadingText : {}
              }
              customContainerStyles={
                isWebView ? styles.webView.headerContainer : {}
              }
            />
            <View
              style={{
                ...styles.buttonView,
                ...(isWebView && styles.webView.extraMargin),
              }}
            >
              <TouchableOpacity
                style={styles.topTabs}
                onPress={() => toggleUser(false, USER_TYPE.MEMBER)}
                disabled={isLoading}
              >
                <CommonText
                  customTextStyle={{
                    ...styles.topTabsText,
                    ...(!active
                      ? styles.webView.selectedSectionHeading
                      : styles.webView.unSelectedSectionHeading),
                  }}
                  fontWeight={!active ? "600" : "500"}
                >
                  {intl.formatMessage({ id: "label.member_candidate" })}
                </CommonText>
                <View
                  style={{
                    ...styles.marginBottom,
                    ...(active
                      ? styles.inActiveStyle
                      : {
                          ...styles.activeStyle,
                          ...(isWebView && styles.webView.activeTab),
                        }),
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.topTabs}
                onPress={() => toggleUser(true, USER_TYPE.COMPANY)}
                disabled={isLoading}
              >
                <View>
                  <CommonText
                    customTextStyle={{
                      ...styles.topTabsText,
                      ...(active
                        ? styles.webView.selectedSectionHeading
                        : styles.webView.unSelectedSectionHeading),
                    }}
                    fontWeight={active ? "600" : "500"}
                  >
                    {intl.formatMessage({ id: "label.company" })}
                  </CommonText>
                </View>
                <View
                  style={{
                    ...styles.marginBottom,
                    ...(!active
                      ? styles.inActiveStyle
                      : {
                          ...styles.activeStyle,
                          ...(isWebView && styles.webView.activeTab),
                        }),
                  }}
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
                ...styles.containerStyle,
                ...containerStyle,
              }}
            >
              <View
                style={{
                  ...(isWebView ? styles.webView.backGroundColor : {}),
                }}
              >
                <View
                  style={{
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
                    eyeImage
                    isPassword
                    customLabelStyle={
                      isWebView ? styles.webView.inputLabelText : {}
                    }
                    customTextInputContainer={
                      isWebView ? styles.webView.inputTextBox : {}
                    }
                    isPaddingNotRequired
                  />
                  <View style={styles.forgotButtonContainer}>
                    <TouchableOpacity
                      onPress={onForgotPasswordClick}
                      style={styles.forgotPasswordView}
                    >
                      <CommonText
                        customTextStyle={{
                          ...styles.forgotPasswordText,
                          ...(isWebView
                            ? styles.webView.forgotPasswordText
                            : {}),
                        }}
                        fontWeight="600"
                      >
                        {intl.formatMessage({
                          id: "label.forgot_password",
                        })}
                      </CommonText>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={
                    isWebView
                      ? styles.webView.buttonContainerStyle
                      : styles.buttonContainerStyle
                  }
                >
                  <CustomButton
                    onPress={onLogin}
                    disabled={loginDisabled}
                    isLoading={isLoading}
                    type={"submit"}
                    withGreenBackground
                  >
                    {intl.formatMessage({ id: "label.login" })}
                  </CustomButton>
                  <View style={styles.accountView}>
                    <CommonText
                      customTextStyle={{
                        ...styles.accountText,
                        ...(isWebView
                          ? styles.webView.dontHaveAccountText
                          : {}),
                      }}
                    >
                      {intl.formatMessage({
                        id: "label.dont_have_account",
                      })}
                    </CommonText>
                    <TouchableOpacity onPress={onCreateNewPasswordClick}>
                      <CommonText
                        customTextStyle={{
                          ...styles.newAccountText,
                          ...(isWebView
                            ? styles.webView.createNewAccountText
                            : {}),
                        }}
                        fontWeight="600"
                      >
                        {intl.formatMessage({
                          id: "label.create_new_account",
                        })}
                      </CommonText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {!isWebView && (
                <View style={styles.followUsImageView}>
                  <FollowUsIcons />
                </View>
              )}
            </ScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={{
                ...styles.companyView,
                ...(isWebView && styles.webView.backGroundColor),
              }}
            >
              <View
                style={{
                  ...styles.memberContainerStyle,
                  ...containerStyle,
                }}
              >
                <View
                  style={{
                    ...(isWebView && styles.webView.backGroundColor),
                  }}
                >
                  <CustomTextInput
                    label={intl.formatMessage({ id: "label.srnMRN" })}
                    placeholder={intl.formatMessage({
                      id: "label.srn_mrn_placeholder",
                    })}
                    value={srn}
                    onChangeText={(val) => onChangeSRNNumber(val)}
                    errorMessage={errorMessageForMemberLogin}
                    isError={!!errorMessageForMemberLogin}
                    isMandatory
                    customLabelStyle={
                      isWebView ? styles.webView.inputLabelText : {}
                    }
                    customTextInputContainer={
                      isWebView ? styles.webView.inputTextBox : {}
                    }
                  />
                </View>
                <View
                  style={
                    isWebView
                      ? styles.webView.buttonContainerStyle
                      : styles.buttonContainerStyle
                  }
                >
                  <CustomButton
                    onPress={onLoginForMembers}
                    disabled={!srn.length}
                    isLoading={isLoading}
                    type={"submit"}
                    withGreenBackground
                  >
                    {intl.formatMessage({ id: "label.login" })}
                  </CustomButton>
                  {!isWebView && (
                    <View style={styles.followUsImageView}>
                      <FollowUsIcons />
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          )}
        </View>
        {!!errorWhileLoggingIn && (
          <ToastComponent
            toastMessage={errorWhileLoggingIn}
            onDismiss={handleDismissToast}
          />
        )}
        {logoutDetails?.isLogoutToast && (
          <ToastComponent
            toastMessage={logoutDetails.message}
            onDismiss={handleDismissToast}
          />
        )}
      </WebViewLoginSignUpWrapper>
    </FormWrapper>
  );
};

LoginScreenUI.defaultProps = {
  errorMessage: "",
  errorWhileLoggingIn: "",
  handleDismissToast: () => {},
  options: [],
};

LoginScreenUI.propTypes = {
  active: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  errorWhileLoggingIn: PropTypes.string,
  handleDismissToast: PropTypes.func,
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  logoutDetails: PropTypes.object.isRequired,
  loginDisabled: PropTypes.bool.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onCreateNewPasswordClick: PropTypes.func.isRequired,
  onForgotPasswordClick: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLoginForMembers: PropTypes.func.isRequired,
  options: PropTypes.array,
  password: PropTypes.string.isRequired,
  toggleUser: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default LoginScreenUI;
