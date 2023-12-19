import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import { PASSWORD_VALIDATIONS } from "../../constants/Regex";
import colors from "../../assets/colors";
import styles from "./NewPasswordValidation.style";

const NewPasswordValidation = ({
  confirmNewPassword,
  customContainerStyles,
  newPassword,
  validations,
  setValidations,
}) => {
  const intl = useIntl();
  const bulletStyle = (isValid) => [
    styles.bulletIconStyle,
    styles.activityBulletStyle(isValid),
  ];

  const validatePassword = (password, confirmNewPassword) => {
    return {
      length: PASSWORD_VALIDATIONS.length(password),
      numeric: PASSWORD_VALIDATIONS.numeric.test(password),
      uppercase: PASSWORD_VALIDATIONS.uppercase.test(password),
      lowercase: PASSWORD_VALIDATIONS.lowercase.test(password),
      specialChar: PASSWORD_VALIDATIONS.specialChar.test(password),
      match: password === confirmNewPassword,
    };
  };

  useEffect(() => {
    const updatedValidations = validatePassword(
      newPassword,
      confirmNewPassword
    );
    setValidations(updatedValidations);
  }, [newPassword, confirmNewPassword, setValidations]);

  return (
    <View>
      <CommonText
        customTextStyle={styles.validationText}
        title={intl.formatMessage({ id: "label.password_requirment_text" })}
      />
      <View style={customContainerStyles}>
        <View style={styles.validationView}>
          <View style={bulletStyle(validations.length)}></View>

          <CommonText
            customTextStyle={styles.bulletText}
            title={intl.formatMessage({ id: "label.char_length_validation" })}
          />
        </View>
        <View style={styles.validationView}>
          <View style={bulletStyle(validations.numeric)}></View>

          <CommonText
            customTextStyle={styles.bulletText}
            title={intl.formatMessage({ id: "label.numeric_char_validation" })}
          />
        </View>
        <View style={styles.validationView}>
          <View style={bulletStyle(validations.uppercase)}></View>

          <CommonText
            customTextStyle={styles.bulletText}
            title={intl.formatMessage({ id: "label.upper_case_validation" })}
          />
        </View>
        <View style={styles.validationView}>
          <View style={bulletStyle(validations.lowercase)}></View>

          <CommonText
            customTextStyle={styles.bulletText}
            title={intl.formatMessage({ id: "label.lower_case_validation" })}
          />
        </View>
        <View style={styles.validationView}>
          <View style={bulletStyle(validations.specialChar)}></View>

          <CommonText
            customTextStyle={styles.bulletText}
            title={intl.formatMessage({ id: "label.special_char_validation" })}
          />
        </View>
      </View>
    </View>
  );
};

NewPasswordValidation.propTypes = {
  confirmNewPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  customContainerStyles: PropTypes.object,
  validations: PropTypes.object.isRequired,
  setValidations: PropTypes.func.isRequired,
};

export default NewPasswordValidation;
