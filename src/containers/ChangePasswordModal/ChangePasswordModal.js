import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import FiveColumn from "../../core/layouts/FiveColumn";

import ActionPairButton from "../../components/ActionPairButton/ActionPairButton";
import CustomTextInput from "../../components/CustomTextInput";
import NewPasswordValidation from "../../components/NewPasswordValidation";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useChangePasswordApi from "../../services/apiServices/hooks/useChangePasswordApi";
import useIsWebView from "../../hooks/useIsWebView";
import {
  handleNewPasswordChange,
  handleConfirmPasswordChange,
  onConfirmPasswordBlur,
  strongPasswordValidator,
} from "../../utils/validation";
import styles from "./ChangePasswordModal.style";

const ChangePasswordModal = ({ onPressCancel }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const isPasswordStrong = strongPasswordValidator(newPassword);
  const doPasswordsMatch = newPassword === confirmNewPassword;

  const {
    errorWhileChangePassword,
    handleUseChangePassword,
    isLoading,
    isSuccess,
    setErrorWhileChangePassword,
  } = useChangePasswordApi();

  const isNextDisabled = () => {
    return (
      !confirmNewPassword || !isPasswordStrong || !oldPassword || !newPassword
    );
  };

  const handleDismissToast = () => {
    setErrorWhileChangePassword("");
  };

  const handleSave = () => {
    if (isNextDisabled()) return;

    if (!doPasswordsMatch) {
      setError(intl.formatMessage({ id: "label.password-not-match" }));
      return;
    }
    setError(null);
    if (isPasswordStrong) {
      handleUseChangePassword({
        current_password: oldPassword,
        new_password: newPassword,
      });
    }
  };

  const baseStyle = isWebView ? styles.containerStyle : styles.inputStyle;
  const errorStyle = isWebView
    ? styles.erroInputStyleWeb
    : styles.erroInputStyle;
  const customStyle = error ? errorStyle : baseStyle;

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonStyle,
          buttonOneLeftSectionStyle: styles.leftButtonStyle,
          buttonTwoRightSectionStyle: styles.rightButtonStyle,
        }
      : {};

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...styles.contentContainerStyle,
          ...(isWebView ? styles.webContentContainerStyle : {}),
        }}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={false}
      >
        <FiveColumn
          firstSection={
            <CustomTextInput
              label={intl.formatMessage({ id: "label.old_password" })}
              placeholder={intl.formatMessage({
                id: "label.old_password_placeholder",
              })}
              customStyle={styles.containerStyle}
              value={oldPassword}
              onChangeText={(val) => setOldPassword(val)}
              isMandatory
              eyeImage
              isPassword
            />
          }
          secoundSection={
            <CustomTextInput
              label={intl.formatMessage({ id: "label.new_password" })}
              placeholder={intl.formatMessage({
                id: "label.enter_your_new_password",
              })}
              customStyle={styles.containerStyle}
              value={newPassword}
              onChangeText={(val) => {
                handleNewPasswordChange({
                  confirmNewPassword,
                  setNewPassword,
                  setError,
                  val,
                });
              }}
              customHandleBlur={() => {
                onConfirmPasswordBlur({
                  confirmNewPassword,
                  newPassword,
                  setError,
                  errorMessage: intl.formatMessage({
                    id: "label.password-not-match",
                  }),
                });
              }}
              isMandatory
              eyeImage
              isPassword
            />
          }
          thirdSection={
            <CustomTextInput
              label={intl.formatMessage({ id: "label.confirm_new_password" })}
              placeholder={intl.formatMessage({
                id: "label.confirm_your_new_password",
              })}
              value={confirmNewPassword}
              onChangeText={(val) => {
                handleConfirmPasswordChange({
                  newPassword,
                  setConfirmNewPassword,
                  setError,
                  val,
                });
              }}
              customHandleBlur={() => {
                onConfirmPasswordBlur({
                  confirmNewPassword,
                  newPassword,
                  setError,
                  errorMessage: intl.formatMessage({
                    id: "label.password-not-match",
                  }),
                });
              }}
              customStyle={customStyle}
              isMandatory
              eyeImage
              isError={!!error}
              errorMessage={error}
              isPassword
            />
          }
          fourthSection={
            <View style={styles.fourthSectionStyle}>
              <NewPasswordValidation
                {...{ newPassword, confirmNewPassword }}
                customContainerStyles={
                  isWebView
                    ? styles.webView.requirementsPoints(currentBreakpoint)
                    : styles.requirementsPoints
                }
              />
            </View>
          }
        ></FiveColumn>
      </ScrollView>
      <View style={isWebView ? styles.buttonWebStyle : {}}>
        <View style={isWebView ? styles.subContainerStyle : {}}>
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.save" })}
            customStyles={{
              ...isWebProps,
              customContainerStyle: styles.customContainerStyle,
            }}
            displayLoader={isLoading}
            isDisabled={isNextDisabled() || isSuccess}
            isButtonTwoGreen
            onPressButtonOne={() => {
              onPressCancel(false);
            }}
            onPressButtonTwo={handleSave}
          />
        </View>
      </View>
      {(errorWhileChangePassword || isSuccess) && (
        <ToastComponent
          toastMessage={
            errorWhileChangePassword ||
            intl.formatMessage({
              id: "label.change_password_message",
            })
          }
          onDismiss={handleDismissToast}
        />
      )}
    </>
  );
};

ChangePasswordModal.propTypes = {
  onPressCancel: PropTypes.func,
};

export default ChangePasswordModal;
