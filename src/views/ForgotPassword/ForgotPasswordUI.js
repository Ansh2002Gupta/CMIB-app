import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { useMediaQuery } from "@unthinkable/react-util";

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
  const width1200pxOrLess = useMediaQuery("(max-width: 1200px)");
  const width900pxOrLess = useMediaQuery("(max-width: 900px)");

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "forgotPasswordWebContainer": {
        if (width900pxOrLess) {
          return {
            ...styles.forgotPasswordWebContainer,
            ...styles.mdScreenContainers,
          };
        }
        if (width1200pxOrLess) {
          return {
            ...styles.forgotPasswordWebContainer,
            ...styles.largeScreenContainers,
          };
        }
        return {
          ...styles.forgotPasswordWebContainer,
        };
      }

      case "label.forgotPassword": {
        if (width900pxOrLess) {
          return {
            ...styles.webFontFamily,
            ...styles.width900pxOrLessForgotHeading,
          };
        }
        if (width1200pxOrLess) {
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

      case "label.forgotPasswordText": {
        if (width900pxOrLess) {
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
        if (width900pxOrLess) {
          return {
            ...styles.width900pxOrWebEmailInput,
          };
        }
        return {
          ...styles.webEmailInput,
        };
      }

      case "submitButtonContainer": {
        if (width900pxOrLess) {
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
        <View style={isWebView ? styles.webContainer : styles.container}>
            <HeaderText
              label={intl.formatMessage({ id: "label.forgotPasswordText" })}
              text={intl.formatMessage({ id: "label.forgotPassword" })}
              customTextStyle={
                isWebView ? getResponsiveStyles("label.forgotPassword") : {}
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
              label={intl.formatMessage({ id: "label.enterId" })}
              placeholder={intl.formatMessage({ id: "label.enterEmail" })}
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
            custonButtonContainer={
              isWebView ? getResponsiveStyles("submitButtonContainer") : {}
            }
          />
          <TouchableOpacity>
            <Text
              style={
                isWebView
                  ? [styles.backToLoginText, styles.webFontFamily]
                  : styles.backToLoginText
              }
              onPress={onClickGoToLogin}
            >
              {intl.formatMessage({ id: "label.backToLogin" })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {successLogin ? (
        <CustomModal
          headerText={intl.formatMessage({ id: "label.thanks" })}
          secondaryText={intl.formatMessage({ id: "label.passwordResetText" })}
          onPress={() => {
            onClickGoToLogin();
          }}
          buttonTitle={intl.formatMessage({ id: "label.goBackToLogin" })}
          isSuccess
        ></CustomModal>
      ) : null}
    </View>
  );
};

export default ForgotPasswordUI;
