import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { ScrollView, View } from "@unthinkable/react-core-components";

import FiveColumn from "../../core/layouts/FiveColumn";

import ActionPairButton from "../../components/ActionPairButton/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomTextInput from "../../components/CustomTextInput";
import NewPasswordValidation from "../../components/NewPasswordValidation";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useChangePasswordApi from "../../services/apiServices/hooks/useChangePasswordApi";
import useIsWebView from "../../hooks/useIsWebView";
import { strongPasswordValidator } from "../../utils/validation";
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
  } = useChangePasswordApi();

  const isNextDisabled = () => {
    return (
      !confirmNewPassword || !isPasswordStrong || !oldPassword || !newPassword
    );
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

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          ...styles.contentContainerStyle,
          ...(isWebView ? styles.webContentContainerStyle : {}),
        }}
        keyboardShouldPersistTaps="handled"
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
              onChangeText={(val) => setNewPassword(val)}
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
              customStyle={styles.containerStyle}
              value={confirmNewPassword}
              onChangeText={(val) => setConfirmNewPassword(val)}
              isMandatory
              eyeImage
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
              {!!error && (
                <CommonText
                  customContainerStyle={styles.notMatchingError}
                  customTextStyle={styles.errorText}
                >
                  {error}
                </CommonText>
              )}
            </View>
          }
          fiveSection={
            !!errorWhileChangePassword && (
              <View style={styles.saveAndCancelButtonView}>
                <CommonText customTextStyle={styles.errorText}>
                  {errorWhileChangePassword}
                </CommonText>
              </View>
            )
          }
        ></FiveColumn>
      </ScrollView>
      <View style={isWebView ? styles.buttonWebStyle : {}}>
        <View style={isWebView ? styles.subContainerStyle : {}}>
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.save" })}
            customStyles={{
              customContainerStyle: styles.customContainerStyle,
            }}
            displayLoader={isLoading}
            isDisabled={isNextDisabled()}
            isButtonTwoGreen
            onPressButtonOne={() => {
              onPressCancel(false);
            }}
            onPressButtonTwo={handleSave}
          />
        </View>
      </View>
      {isSuccess && (
        <ToastComponent
          toastMessage={intl.formatMessage({
            id: "label.change_password_message",
          })}
          onDismiss={() => {}}
        />
      )}
    </>
  );
};

ChangePasswordModal.propTypes = {
  onPressCancel: PropTypes.func,
};

export default ChangePasswordModal;
