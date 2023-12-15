import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import FiveColumn from "../../core/layouts/FiveColumn";

import CommonText from "../../components/CommonText";
import CustomTextInput from "../../components/CustomTextInput";
import CreateNewPasswordValidation from "../../components/CreateNewPasswordValidation/CreateNewPasswordValidation";
import SaveCancelButton from "../../components/SaveCancelButton/SaveCancelButton";
import useChangePasswordApi from "../../services/apiServices/hooks/useChangePasswordApi";
import styles from "./ChangePasswordModal.style";

const ChangePasswordModal = ({ onPressCancel }) => {
  const intl = useIntl();
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isAnyPasswordFieldLeft, setIsAnyPasswordFieldLeft] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    numeric: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    match: false,
  });
  const { errorWhileChangePassword, handleUseChangePassword, isLoading } =
    useChangePasswordApi();

  const onChangeOldPassword = (val) => {
    setOldPassword(val);
  };

  const onChangeNewPassword = (val) => {
    setNewPassword(val);
    setIsAnyPasswordFieldLeft(false);
  };

  const onChangeConfoirmNewPassword = (val) => {
    setConfirmNewPassword(val);
  };

  useEffect(() => {
    return () => {
      setIsAnyPasswordFieldLeft(false);
    };
  }, []);

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
    if (!areAllFieldsValid()) {
      setIsAnyPasswordFieldLeft(true);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError(intl.formatMessage({ id: "label.password-not-match" }));
      return;
    }
    setError(null);
    setIsAnyPasswordFieldLeft(false);
    if (areAllFieldsValid()) {
      handleUseChangePassword(oldPassword, newPassword);
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
    <ScrollView style={styles.mainView}>
      <FiveColumn
        firstSection={
          <CustomTextInput
            label={intl.formatMessage({ id: "label.old_password" })}
            placeholder={intl.formatMessage({
              id: "label.password_placeholder",
            })}
            value={oldPassword}
            onChangeText={(val) => onChangeOldPassword(val)}
            isMandatory
            eyeImage={true}
            isPassword={true}
          />
        }
        secoundSection={
          <CustomTextInput
            label={intl.formatMessage({ id: "label.new_password" })}
            placeholder={intl.formatMessage({
              id: "label.password_placeholder",
            })}
            value={newPassword}
            onChangeText={(val) => onChangeNewPassword(val)}
            isMandatory
            eyeImage={true}
            isPassword={true}
          />
        }
        thirdSection={
          <CustomTextInput
            label={intl.formatMessage({ id: "label.confirm_new_password" })}
            placeholder={intl.formatMessage({
              id: "label.password_placeholder",
            })}
            value={confirmNewPassword}
            onChangeText={(val) => onChangeConfoirmNewPassword(val)}
            isMandatory
            eyeImage={true}
            isPassword={true}
          />
        }
        fourthSection={
          <View>
            {error ? (
              <CommonText
                title={error}
                customTextStyle={styles.passwordMatchStyle}
              />
            ) : null}
            <CreateNewPasswordValidation
              {...{
                newPassword,
                confirmNewPassword,
                setIsAnyPasswordFieldLeft,
                validations,
                setValidations,
              }}
            />
          </View>
        }
        fiveSection={
          <View style={styles.saveAndCancelButtonView}>
            {errorWhileChangePassword ? (
              <CommonText
                title={errorWhileChangePassword}
                customTextStyle={styles.errorText}
              />
            ) : null}

            <SaveCancelButton
              customContainerStyle={styles.customContainerStyle}
              buttonOneText={intl.formatMessage({ id: "label.cancel" })}
              onPressButtonOne={() => {
                onPressCancel(false);
              }}
              onPressButtonTwo={() => areAllFieldFilledInPassword()}
              isNextDisabled={isNextDisabled()}
              buttonTwoText={intl.formatMessage({ id: "label.save" })}
            />
          </View>
        }
      ></FiveColumn>
    </ScrollView>
  );
};

ChangePasswordModal.propTypes = {
  onPressCancel: PropTypes.func,
};

export default ChangePasswordModal;
