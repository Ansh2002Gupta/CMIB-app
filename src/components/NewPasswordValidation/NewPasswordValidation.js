import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import colors from "../../assets/colors";
import styles from "./NewPasswordValidation.style";

const NewPasswordValidation = ({
  confirmNewPassword,
  newPassword,
  customContainerStyles,
  validations,
  setValidations,
}) => {
  const intl = useIntl();
  const bulletStyle = (isValid) => [
    styles.bulletIconStyle,
    {
      backgroundColor: isValid ? colors.green : colors.lightGrey,
    },
  ];
  useEffect(() => {
    const validatePassword = () => {
      setValidations({
        length: newPassword.length >= 6,
        numeric: /[0-9]/.test(newPassword),
        uppercase: /[A-Z]/.test(newPassword),
        lowercase: /[a-z]/.test(newPassword),
        specialChar: /[!?.@#$%^&+=]/.test(newPassword),
        match: newPassword === confirmNewPassword,
      });
    };
    validatePassword();
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
