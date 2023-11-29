import React, { useEffect, useState } from "react";
import { Text, View } from "@unthinkable/react-core-components";
import styles from "./ConfirmPasswordValidation.style";
import colors from "../../assets/colors";
import { useIntl } from "react-intl";

const CreateNewPasswordValidation = ({ confirmNewPassword, newPassword }) => {
  const intl = useIntl();
  const [validations, setValidations] = useState({
    length: false,
    numeric: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    match: false,
  });

  const bulletStyle = (isValid) => [
    styles.bulletIconStyle,
    {
      backgroundColor: isValid ? colors.green : colors.lightGrey,
    },
  ];
  const validatePassword = (newPassword, confirmNewPassword) => {
    setValidations({
      length: newPassword.length >= 6,
      numeric: /[0-9]/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      specialChar: /[!?.@#$%^&+=]/.test(newPassword),
      match: newPassword === confirmNewPassword,
    });
  };

  useEffect(() => {
    validatePassword(newPassword, confirmNewPassword);
  }, [newPassword, confirmNewPassword]);

  return (
    <View>
      <Text style={styles.validationText}>
        {intl.formatMessage({ id: "label.passwordRequirment" })}
      </Text>
      <View style={styles.validationView}>
        <View style={bulletStyle(validations.length)}></View>
        <Text style={styles.bulletText}>
          {intl.formatMessage({ id: "label.characterLength" })}
        </Text>
      </View>
      <View style={styles.validationView}>
        <View style={bulletStyle(validations.numeric)}></View>
        <Text style={styles.bulletText}>
          {intl.formatMessage({ id: "label.numericCharacter" })}
        </Text>
      </View>
      <View style={styles.validationView}>
        <View style={bulletStyle(validations.uppercase)}></View>
        <Text style={styles.bulletText}>
          {intl.formatMessage({ id: "label.upercaseCharacter" })}
        </Text>
      </View>
      <View style={styles.validationView}>
        <View style={bulletStyle(validations.lowercase)}></View>
        <Text style={styles.bulletText}>
          {intl.formatMessage({ id: "label.lowercaseCharacter" })}
        </Text>
      </View>
      <View style={styles.validationView}>
        <View style={bulletStyle(validations.specialChar)}></View>
        <Text style={styles.bulletText}>
          {intl.formatMessage({ id: "label.specialCharacter" })}
        </Text>
      </View>
    </View>
  );
};

export default CreateNewPasswordValidation;
