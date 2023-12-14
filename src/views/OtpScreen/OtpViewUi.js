import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import ButtonComponent from "../../components/ButtonComponent";
import CustomModal from "../../components/CustomModal";
import HeaderText from "../../components/HeaderText/HeaderText";
import OtpComponent from "../../components/OptComponent/OtpComponent"
import styles from "./OtpView.style";

const OtpViewUI = (props) => {
  const {
    successLogin,
    otpValue,
    handleOtpChange,
    errorMessage,
    onClickForgotPassword,
    onClickGoToLogin,
    intl,
    loginDisabled,
    onResendOtpClick,
    otpLeft,
    isCounter,
    setIsCounter,
    minutes,
    setMinutes,
    seconds,
    setSeconds,

  } = props;


  useEffect(() => {
    let myInterval = setInterval(() => {
      setIsCounter(true);
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
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

      // case "textInputView": {
      //   if (currentBreakpoint === "sm") {
      //     return {
      //       ...styles.width900pxOrWebEmailInput,
      //     };
      //   }
      //   return {
      //     ...styles.webEmailInput,
      //   };
      // }

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
            {otpLeft > 0 ?
              <View style={styles.textLabelParent}>
                <Text style={styles.textlabel}>{"Haven’t received the OTP?"} </Text>
                {isCounter ?
                  <Text style={styles.textlabelTimer}> Send Again ( {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} )</Text>
                  :
                  <TouchableOpacity onPress={onResendOtpClick}>
                    <Text style={styles.textlabelReset}> Send Again ({otpLeft} left)</Text>
                  </TouchableOpacity>
                }
              </View>
              :
              <View style={styles.textLabelAfterParent}>
                <Text style={styles.textlabel}>{"You have requested OTP for 4 times! "} </Text>
                <Text style={styles.textlabel}>You can resend the next OTP after {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}  </Text>
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
      {successLogin ? (
        <CustomModal
          headerText={intl.formatMessage({ id: "label.thanks" })}
          secondaryText={intl.formatMessage({
            id: "label.reset_password_info_text",
          })}
          onPress={() => {
            onClickGoToLogin();
          }}
          buttonTitle={intl.formatMessage({ id: "label.go_back_to_login" })}
          isSuccess
        />
      ) : null}
    </View>
  );
};

export default OtpViewUI;
