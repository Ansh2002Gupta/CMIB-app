import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import ButtonComponent from "../../components/ButtonComponent";
import CustomModal from "../../components/CustomModal";
import CustomTextInput from "../../components/CustomTextInput";
import HeaderText from "../../components/HeaderText/HeaderText";
import styles from "./ForgotPassword.style";

const ForgotPasswordUI = (props) => {
  const {
    onClickForgotPassword,
    onClickGoToLogin,
    onChangeInput,
    userName,
    successLogin,
    errorMessage,
    intl,
  } = props;
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

      case "label.enter_email_to_reset_password": {
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
              id: "label.enter_email_to_reset_password",
            })}
            text={intl.formatMessage({ id: "label.forgot_password" })}
            customTextStyle={
              isWebView ? getResponsiveStyles("label.forgot_password") : {}
            }
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
            <CustomTextInput
              label={intl.formatMessage({ id: "label.enter_id" })}
              placeholder={intl.formatMessage({
                id: "label.email_id_placeholder",
              })}
              value={userName}
              onChangeText={(val) => {
                onChangeInput(val);
              }}
              errorMessage={errorMessage}
              customAsteriskStyle={styles.customAsteriskStyle}
              isMandatory
              isError={!!errorMessage}
            />
          </View>
        </View>
        <View style={isWebView ? styles.webSubmitView : styles.submitView}>
          <ButtonComponent
            title={intl.formatMessage({ id: "label.submit" })}
            onPress={onClickForgotPassword}
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

export default ForgotPasswordUI;
