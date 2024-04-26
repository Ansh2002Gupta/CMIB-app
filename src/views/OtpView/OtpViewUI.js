import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import FormWrapper from "../../components/FormWrapper";
import HeaderTextWithLabelAndDescription from "../../components/HeaderTextWithLabelAndDescription";
import OtpInput from "../../components/OtpInput/index";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../hooks/useIsWebView";
import {
  OTP_TRY_COUNT,
  OTP_TIMER_MAX_MINUTES,
} from "../../constants/constants";
import commonStyles from "../../theme/styles/commonStyles";
import getStyles from "./OtpView.style";

const OtpViewUI = ({
  description,
  email,
  errorMessage,
  handleDismissToast,
  handleOtpChange,
  headerText,
  intl,
  isCounter,
  isMemberLogin,
  isLoading,
  minutes,
  onResendOtpClick,
  onClickGoToLogin,
  onVerifyOtpClick,
  otpLeft,
  seconds,
  setMinutes,
  setOtpLeft,
  setSeconds,
  setIsCounter,
  setSendOtpResult,
  submitDisabled,
  validationError,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [afterAttempt, setAfterAttempt] = useState(false);
  const formattedTimerValue = `${intl.formatMessage({
    id: "label.request_otp_again",
  })} ${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  } ${intl.formatMessage({ id: "label.braces" })}`;
  const formatedOtpLeftValue = `${intl.formatMessage({
    id: "label.request_otp_again",
  })} ${otpLeft} ${intl.formatMessage({ id: "label.left_brace" })}`;
  const textFirstHeading = `${intl.formatMessage({
    id: "label.request_otp",
  })} ${OTP_TRY_COUNT} ${intl.formatMessage({ id: "label.times" })}`;
  const textSecondHeading = `${intl.formatMessage({
    id: "label.request_otp_next",
  })} ${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  useEffect(() => {
    let timer = setInterval(() => {
      setIsCounter(true);
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setOtpLeft((prev) => prev - 1);
          clearInterval(timer);
          setIsCounter(false);
        } else {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [minutes, seconds]);

  useEffect(() => {
    if (otpLeft === 0) {
      setAfterAttempt(true);
      setMinutes(OTP_TIMER_MAX_MINUTES);
    }
  }, [otpLeft]);

  const { isWebView } = useIsWebView();

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "forgotPasswordWebContainer": {
        return {
          ...styles.forgotPasswordWebContainer,
          ...styles.commonScreenContainers,
        };
      }
      case "label.enter_otp":
      case "label.forgot_password": {
        if (currentBreakpoint === "sm") {
          return {
            ...styles.webFontFamily,
            ...styles.width900pxOrLessForgotHeading,
          };
        }
        if (currentBreakpoint === "md") {
          return {
            ...styles.webFontFamily,
            ...styles.width1200pxOrLessForgotHeading,
          };
        }
        return {
          ...styles.webFontFamily,
          ...styles.forgotHeaderText,
        };
      }
      case "otp_text_forgot_password":
      case "label.otp_text": {
        if (currentBreakpoint === "sm") {
          return {
            ...styles.webFontFamily,
            ...styles.customSubHeading,
            ...styles.width900pxOrCustomSubHeading,
          };
        }
        return {
          ...styles.webFontFamily,
          ...styles.customSubHeading,
        };
      }

      case "textInputView": {
        if (currentBreakpoint === "sm") {
          return {
            ...styles.width900pxOrWebEmailInput,
          };
        }
        return {
          ...styles.webEmailInput,
        };
      }
      default:
        return;
    }
  };

  return (
    <FormWrapper
      customFormStyle={commonStyles.mainView}
      onSubmit={onVerifyOtpClick}
    >
      <View style={styles.mainView}>
        <View
          style={{
            ...styles.forgotHeaderContainer,
            ...(isWebView
              ? getResponsiveStyles("forgotPasswordWebContainer")
              : styles.grayBackground),
          }}
        >
          <View
            style={
              isWebView
                ? styles.container
                : [styles.container, styles.mobContainer]
            }
          >
            <HeaderTextWithLabelAndDescription
              description={
                description ||
                intl.formatMessage({
                  id: "label.otp_text",
                })
              }
              headerText={
                headerText || intl.formatMessage({ id: "label.enter_otp" })
              }
              customTextStyle={
                isWebView
                  ? getResponsiveStyles("label.forgot_password")
                  : { ...styles.forgotPasswordStyle }
              }
              customContainerStyles={
                isWebView ? styles.forgotHeaderContainer : {}
              }
            />
            <View
              style={{
                ...styles.containerStyle,
                ...(isWebView ? styles.webContainerStyle : {}),
              }}
            >
              <CommonText
                customTextStyle={styles.emailStyle}
                customContainerStyle={styles.emailContainerStyle}
              >
                {!isMemberLogin
                  ? `${intl.formatMessage({
                      id: "label.email_address",
                    })}${email}`
                  : null}
              </CommonText>
              <CustomTouchableOpacity
                onPress={() => {
                  setSendOtpResult({});
                }}
              >
                <CommonText
                  customTextStyle={styles.changeStyle}
                  fontWeight="600"
                >
                  {!isMemberLogin
                    ? intl.formatMessage({
                        id:
                          currentBreakpoint === "sm" ||
                          currentBreakpoint === "xs"
                            ? "label.change"
                            : "label.change_email_address",
                      })
                    : null}
                </CommonText>
              </CustomTouchableOpacity>
            </View>
            {!isWebView && <View style={styles.borderStyle} />}
          </View>
          <View style={isWebView ? styles.whiteBackground : styles.companyView}>
            <View
              style={
                isWebView
                  ? getResponsiveStyles("textInputView")
                  : styles.firstTextInput
              }
            >
              <OtpInput
                label={intl.formatMessage({ id: "label.text_otp" })}
                onOtpChange={handleOtpChange}
                isMandatory
                errorMessage={errorMessage}
                isError={!!errorMessage}
              />
              {otpLeft > 0 && (
                <View style={styles.textLabelParent}>
                  <CommonText customTextStyle={styles.textlabel}>
                    {intl.formatMessage({ id: "label.otp_recieved" })}
                  </CommonText>
                  {isCounter ? (
                    <CommonText
                      customTextStyle={styles.textlabelTimer}
                      fontWeight="600"
                    >
                      {formattedTimerValue}
                    </CommonText>
                  ) : (
                    <CustomTouchableOpacity onPress={onResendOtpClick}>
                      <CommonText
                        customTextStyle={styles.textlabelReset}
                        fontWeight="600"
                      >
                        {formatedOtpLeftValue}
                      </CommonText>
                    </CustomTouchableOpacity>
                  )}
                </View>
              )}
              {otpLeft === 0 && isCounter && !afterAttempt && (
                <View style={styles.textLabelParent}>
                  <CommonText customTextStyle={styles.textlabel}>
                    {intl.formatMessage({ id: "label.otp_recieved" })}
                  </CommonText>
                  <CommonText
                    customTextStyle={styles.textlabelTimer}
                    fontWeight="600"
                  >
                    {formattedTimerValue}
                  </CommonText>
                </View>
              )}
              {otpLeft === 0 && afterAttempt && (
                <View style={styles.textLabelAfterParent}>
                  <CommonText customTextStyle={styles.textlabel}>
                    {textFirstHeading}
                  </CommonText>
                  <CommonText customTextStyle={styles.textlabel}>
                    {textSecondHeading}
                  </CommonText>
                </View>
              )}
            </View>
          </View>
          <View style={isWebView ? styles.webSubmitView : styles.submitView}>
            <CustomButton
              style={styles.submitButton}
              disabled={submitDisabled}
              isLoading={isLoading}
              onPress={onVerifyOtpClick}
              type={"submit"}
              withGreenBackground
            >
              {intl.formatMessage({ id: "label.submit" })}
            </CustomButton>
            <View style={styles.backToLoginContainer}>
              <CustomTouchableOpacity onPress={onClickGoToLogin}>
                <CommonText
                  customTextStyle={styles.backToLoginText}
                  fontWeight="600"
                >
                  {intl.formatMessage({ id: "label.back_to_login" })}
                </CommonText>
              </CustomTouchableOpacity>
            </View>
          </View>
        </View>
        {!!validationError && (
          <ToastComponent
            toastMessage={validationError}
            onDismiss={handleDismissToast}
          />
        )}
      </View>
    </FormWrapper>
  );
};

OtpViewUI.defaultProps = {
  errorMessage: "",
  email: "",
  handleDismissToast: () => {},
  isCounter: false,
  isLoading: false,
  submitDisabled: false,
  minutes: 0,
  onVerifyOtpClick: () => {},
  onClickGoToLogin: () => {},
  otpLeft: 0,
  setIsCounter: () => {},
  setOtpLeft: () => {},
  setMinutes: () => {},
  seconds: 0,
  setSeconds: () => {},
  validationError: "",
};

OtpViewUI.propTypes = {
  errorMessage: PropTypes.string,
  email: PropTypes.string,
  handleOtpChange: PropTypes.func.isRequired,
  handleDismissToast: PropTypes.func,
  isCounter: PropTypes.bool,
  isLoading: PropTypes.bool,
  intl: PropTypes.object.isRequired,
  submitDisabled: PropTypes.bool,
  minutes: PropTypes.number,
  onVerifyOtpClick: PropTypes.func,
  onClickGoToLogin: PropTypes.func,
  onResendOtpClick: PropTypes.func.isRequired,
  otpLeft: PropTypes.number,
  setOtpLeft: PropTypes.func,
  setIsCounter: PropTypes.func,
  setMinutes: PropTypes.func,
  seconds: PropTypes.number,
  setSeconds: PropTypes.func,
  validationError: PropTypes.string,
};

export default OtpViewUI;
