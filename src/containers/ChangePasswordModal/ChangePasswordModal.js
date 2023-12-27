import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import FiveColumn from "../../core/layouts/FiveColumn";

import CommonText from "../../components/CommonText";
import CustomTextInput from "../../components/CustomTextInput";
import NewPasswordValidation from "../../components/NewPasswordValidation";
import SaveCancelButton from "../../components/SaveCancelButton/SaveCancelButton";
import useChangePasswordApi from "../../services/apiServices/hooks/useChangePasswordApi";
import styles from "./ChangePasswordModal.style";

const ChangePasswordModal = ({ onPressCancel }) => {
  const intl = useIntl();
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    lowercase: false,
    match: false,
    numeric: false,
    specialChar: false,
    uppercase: false,
  });
  const { errorWhileChangePassword, handleUseChangePassword, isLoading } =
    useChangePasswordApi();

  const areAllFieldsValid = () => {
    return (
      validations.length &&
      validations.numeric &&
      validations.uppercase &&
      validations.lowercase &&
      validations.specialChar
    );
  };

  const areAllFieldFilledInPassword = () => {
    if (newPassword !== confirmNewPassword) {
      setError(intl.formatMessage({ id: "label.password-not-match" }));
      return;
    }
    setError(null);
    if (areAllFieldsValid()) {
      handleUseChangePassword({
        old_password: oldPassword,
        password: newPassword,
      });
    }
  };

  const isNextDisabled = () => {
    return (
      !oldPassword ||
      !newPassword ||
      !confirmNewPassword ||
      !validations.length ||
      !validations.numeric ||
      !validations.uppercase ||
      !validations.lowercase ||
      !validations.specialChar
    );
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        <FiveColumn
          firstSection={
            <CustomTextInput
              label={intl.formatMessage({ id: "label.old_password" })}
              placeholder={intl.formatMessage({
                id: "label.old_password_placeholder",
              })}
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
              value={confirmNewPassword}
              onChangeText={(val) => setConfirmNewPassword(val)}
              isMandatory
              eyeImage
              isPassword
            />
          }
          fourthSection={
            <View style={styles.fourthSectionStyle}>
              {!!error && (
                <CommonText
                  title={error}
                  customTextStyle={styles.passwordMatchStyle}
                />
              )}
              <NewPasswordValidation
                {...{
                  newPassword,
                  confirmNewPassword,
                  validations,
                  setValidations,
                }}
              />
            </View>
          }
          fiveSection={
            !!errorWhileChangePassword && (
              <View style={styles.saveAndCancelButtonView}>
                <CommonText
                  title={errorWhileChangePassword}
                  customTextStyle={styles.errorText}
                />
              </View>
            )
          }
        ></FiveColumn>
      </ScrollView>
      <SaveCancelButton
        customContainerStyle={styles.customContainerStyle}
        buttonOneText={intl.formatMessage({ id: "label.cancel" })}
        onPressButtonOne={() => {
          onPressCancel(false);
        }}
        disabled={isLoading}
        onPressButtonTwo={() => areAllFieldFilledInPassword()}
        isNextDisabled={isNextDisabled()}
        buttonTwoText={intl.formatMessage({ id: "label.save" })}
      />
    </>
  );
};

ChangePasswordModal.propTypes = {
  onPressCancel: PropTypes.func,
};

export default ChangePasswordModal;
