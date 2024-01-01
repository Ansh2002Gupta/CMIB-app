import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { TouchableOpacity, View } from "@unthinkable/react-core-components";

import ButtonComponent from "../../components/ButtonComponent";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CustomTextInput from "../../components/CustomTextInput";
import HeaderText from "../../components/HeaderText/HeaderText";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./ForgotPassword.style";

const ForgotPasswordUI = (props) => {
  const {
    onSendOtpClick,
    onClickGoToLogin,
    onChangeInput,
    userEmail,
    successLogin,
    errorMessage,
    intl,
    loginDisabled,
    isLoading,
    handleDismissToast,
    validationError,
  } = props;

  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();

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
            customContainerStyles={
              isWebView ? styles.forgotHeaderContainer : {}
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
              value={userEmail}
              onChangeText={(val) => {
                onChangeInput(val);
              }}
              errorMessage={errorMessage}
              isMandatory
              isError={!!errorMessage}
            />
          </View>
        </View>
        <View style={isWebView ? styles.webSubmitView : styles.submitView}>
          <ButtonComponent
            title={intl.formatMessage({ id: "label.submit" })}
            onPress={onSendOtpClick}
            disabled={loginDisabled}
            customTitleStyle={isWebView ? styles.customBtnText : {}}
            customButtonContainer={
              isWebView ? getResponsiveStyles("submitButtonContainer") : {}
            }
            displayLoader={isLoading}
          />
          <TouchableOpacity onPress={onClickGoToLogin}>
            <CommonText
              customTextStyle={styles.backToLoginText}
              title={intl.formatMessage({ id: "label.back_to_login" })}
            />
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

      {!!validationError && (
        <ToastComponent
          toastMessage={validationError}
          onDismiss={handleDismissToast}
        />
      )}
    </View>
  );
};
ForgotPasswordUI.propTypes = {
  errorMessage: PropTypes.string,
  handleDismissToast: PropTypes.func,
  intl: PropTypes.object.isRequired,
  onSendOtpClick: PropTypes.func,
  onClickGoToLogin: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  successLogin: PropTypes.bool,
  validationError: PropTypes.string,
};

export default ForgotPasswordUI;
