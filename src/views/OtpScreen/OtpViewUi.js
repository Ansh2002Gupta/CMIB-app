import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types"
import { View,TouchableOpacity, } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import ButtonComponent from "../../components/ButtonComponent";
import HeaderText from "../../components/HeaderText/HeaderText";
import CommonText from "../../components/CommonText";
import OtpComponent from "../../components/OptComponent/OtpComponent"
import styles from "./OtpView.style";

import { OTP_TRY_COUNT, OTP_TIMER_MAX_MINUTES } from "../../constants/constants";

const OtpViewUI = (props) => {

  const {
    handleOtpChange,
    errorMessage,
    onClickForgotPassword,
    onClickGoToLogin,
    intl,
    loginDisabled,
    onResendOtpClick,
    otpLeft,
    setOtpLeft,
    isCounter,
    setIsCounter,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = props;


  const [afterAttempt, setAfterAttempt] = useState(false);

  const formattedTimerValue = `${intl.formatMessage({ id: "label.request_otp_again" })} ${minutes < 10 ? `0${minutes}` : minutes
}:${seconds < 10 ? `0${seconds}` : seconds} ${intl.formatMessage({ id: "label.braces" })}`;

const formatedOtpLeftValue = `${intl.formatMessage({ id: "label.request_otp_again" })} ${otpLeft} ${intl.formatMessage({ id: "label.left_brace" })}`;
const textFirstHeading = `${intl.formatMessage({ id: "label.request_otp" })} ${OTP_TRY_COUNT} ${intl.formatMessage({ id: "label.times" })}`;
const textSecondHeading = `${intl.formatMessage({ id: "label.request_otp_next" })} ${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;


  useEffect(() => {
    let myInterval = setInterval(() => {
      setIsCounter(true);
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setOtpLeft(prev => prev - 1);
          clearInterval(myInterval);
          setIsCounter(false);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds]);


  useEffect(() => {
    if (otpLeft === 0) {
      setAfterAttempt(true)
      setMinutes(OTP_TIMER_MAX_MINUTES);
    }
  }, [otpLeft]);

  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "forgotPasswordWebContainer": {
        if (currentBreakpoint === "sm") {
          return {
            ...styles.forgotPasswordWebContainer,
            ...styles.smScreenContainers,
          };
        }
        if (currentBreakpoint === "md") {
          return {
            ...styles.forgotPasswordWebContainer,
            ...styles.mdScreenContainers,
          };
        }
        return {
          ...styles.forgotPasswordWebContainer,
        };
      }

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

      case "submitButtonContainer": {
        if (currentBreakpoint === "sm") {
          return {
            ...styles.width900pxOrLessSubmitBtn,
          };
        }
        return {};
      }
      default:
        return;
    }
  };




  return (
    <View style={styles.mainView}>
      <View
        style={
          isWebView
            ? getResponsiveStyles("forgotPasswordWebContainer")
            : styles.grayBackground
        }
      >
        <View
          style={
            isWebView
              ? styles.container
              : [styles.container, styles.mobContainer]
          }
        >
          <HeaderText
            label={intl.formatMessage({
              id: "label.otp_text",
            })}
            text={intl.formatMessage({ id: "label.forgot_password" })}
            customTextStyle={
              isWebView ? getResponsiveStyles("label.forgot_password") : {}
            }
            customContainerStyles={isWebView && styles.forgotHeaderContainer}
          />
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
            <OtpComponent
              label={intl.formatMessage({ id: "label.text_otp" })}
              onOtpChange={handleOtpChange}
              customAsteriskStyle={styles.customAsteriskStyle}
              isMandatory
              errorMessage={errorMessage}
              isError={!!errorMessage}
            />
            {otpLeft > 0 &&
              <View style={styles.textLabelParent}>
                <CommonText
                  customTextStyle={styles.textlabel}
                  title={intl.formatMessage({ id: "label.otp_recieved" })}
                />
                {isCounter ?
                  <CommonText
                    customTextStyle={styles.textlabelTimer}
                    title={formattedTimerValue}
                  />
                  :
                  <TouchableOpacity onPress={onResendOtpClick}>
                    <CommonText
                      customTextStyle={styles.textlabelReset}
                      title={formatedOtpLeftValue}
                    />
                  </TouchableOpacity>
                }
              </View>
            }

            {otpLeft === 0 && isCounter && !afterAttempt &&
              <View style={styles.textLabelParent}>
                <CommonText
                  customTextStyle={styles.textlabel}
                  title={intl.formatMessage({ id: "label.otp_recieved" })}
                />
                <CommonText
                  customTextStyle={styles.textlabelTimer}
                  title={formattedTimerValue}
                />
              </View>
            }

            {otpLeft === 0 && afterAttempt &&
              <View style={styles.textLabelAfterParent}>
                <CommonText
                  customTextStyle={styles.textlabel}
                  title={textFirstHeading}
                />
                <CommonText
                  customTextStyle={styles.textlabel}
                  title={textSecondHeading}
                />
              </View>
            }


          </View>
        </View>
        <View style={isWebView ? styles.webSubmitView : styles.submitView}>
          <ButtonComponent
            title={intl.formatMessage({ id: "label.submit" })}
            onPress={onClickForgotPassword}
            disabled={loginDisabled}
            customTitleStyle={isWebView && styles.customBtnText}
            customButtonContainer={
              isWebView ? getResponsiveStyles("submitButtonContainer") : {}
            }
          />
          <TouchableOpacity onPress={onClickGoToLogin}>
            <CommonText
                  customTextStyle={isWebView
                    ? [styles.backToLoginText, styles.webFontFamily]
                    : styles.backToLoginText}
                  title={intl.formatMessage({ id: "label.back_to_login" })}
                />

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

OtpViewUI.propTypes = {
  handleOtpChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onClickForgotPassword: PropTypes.func,
  onClickGoToLogin: PropTypes.func,
  intl: PropTypes.object.isRequired,
  loginDisabled: PropTypes.bool,
  onResendOtpClick: PropTypes.func.isRequired,
  otpLeft: PropTypes.number,
  setOtpLeft: PropTypes.number,
  isCounter: PropTypes.bool,
  setIsCounter: PropTypes.bool,
  minutes: PropTypes.number,
  setMinutes: PropTypes.number,
  seconds: PropTypes.number,
  setSeconds: PropTypes.number,

}

export default OtpViewUI;
