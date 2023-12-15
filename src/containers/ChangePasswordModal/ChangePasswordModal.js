import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import CustomTextInput from "../../components/CustomTextInput";
import CreateNewPasswordValidation from "../../components/CreateNewPasswordValidation/CreateNewPasswordValidation";
import SaveCancelButton from "../../components/SaveCancelButton/SaveCancelButton";
import useChangePasswordApi from "../../services/apiServices/hooks/useChangePasswordApi";

import FiveColumn from "../../core/layouts/FiveColumn";
import styles from "./ChangePasswordModal.style";
import CommonText from "../../components/CommonText";

const ChangePasswordModal = ({ onPressCancel }) => {
  const intl = useIntl();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isAnyPasswordFieldLeft, setIsAnyPasswordFieldLeft] = useState(false);
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
      setError("Passwords do not match");
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
      !validations.specialChar ||
      error !== null ||
      newPassword !== confirmNewPassword
    );
  };

  return (
    <ScrollView style={{ paddingBottom: 16 }}>
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
          <View style={{ paddingBottom: 21, paddingTop: 24 }}>
            {errorWhileChangePassword ? (
              <CommonText
                title={errorWhileChangePassword}
                customTextStyle={styles.errorText}
              />
            ) : null}

            <SaveCancelButton
              customContainerStyle={{ bottom: 0 }}
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
  children: PropTypes.object.isRequired,
  customCardComponentStyle: PropTypes.object,
  onPressCancel: PropTypes.func,
};

export default ChangePasswordModal;
