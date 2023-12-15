import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types"
import { View, Text,  TouchableOpacity,} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import ButtonComponent from "../../components/ButtonComponent";
import HeaderText from "../../components/HeaderText/HeaderText";
import OtpComponent from "../../components/OptComponent/OtpComponent"
import styles from "./OtpView.style";

import { OTP_TRY_COUNT,OTP_TIMER_MAX_MINUTES } from "../../constants/constants";

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
    if (otpLeft ===0) {
      console.log('You have used all your OTP attempts.');
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
                <Text style={styles.textlabel}>{intl.formatMessage({ id: "label.otp_recieved" })} </Text>
                {isCounter ?
                  <Text style={styles.textlabelTimer}>  {intl.formatMessage({ id: "label.request_otp_again" })} {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} {intl.formatMessage({ id: "label.braces" })} </Text>
                  :
                  <TouchableOpacity onPress={onResendOtpClick}>
                    <Text style={styles.textlabelReset}> {intl.formatMessage({ id: "label.request_otp_again" })} {otpLeft} {intl.formatMessage({ id: "label.left_brace" })} </Text>
                  </TouchableOpacity>
                }
              </View>
            }

            {otpLeft === 0 && isCounter && !afterAttempt &&
              <View style={styles.textLabelParent}>
                <Text style={styles.textlabel}>{intl.formatMessage({ id: "label.otp_recieved" })} </Text>
                <Text style={styles.textlabelTimer}>  {intl.formatMessage({ id: "label.request_otp_again" })} {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} {intl.formatMessage({ id: "label.braces" })}</Text>
              </View>
            }

            {otpLeft === 0 && afterAttempt &&
              <View style={styles.textLabelAfterParent}>
                <Text style={styles.textlabel}>{intl.formatMessage({ id: "label.request_otp" })} {OTP_TRY_COUNT} {intl.formatMessage({ id: "label.times" })}</Text>
                <Text style={styles.textlabel}>{intl.formatMessage({ id: "label.request_otp_next" })} {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}  </Text>
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
            <Text
              style={
                isWebView
                  ? [styles.backToLoginText, styles.webFontFamily]
                  : styles.backToLoginText
              }
            >
              {intl.formatMessage({ id: "label.back_to_login" })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

OtpViewUI.propTypes ={
  handleOtpChange:  PropTypes.func.isRequired,
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
