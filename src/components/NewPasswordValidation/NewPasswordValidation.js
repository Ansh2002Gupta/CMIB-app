import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import { PASSWORD_VALIDATIONS } from "../../constants/Regex";
import { VALIDATION_TYPE } from "../../constants/constants";
import styles from "./NewPasswordValidation.style";

const NewPasswordValidation = ({
  confirmNewPassword,
  customContainerStyles,
  newPassword,
  setValidations,
  validations,
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
        {VALIDATION_TYPE.map((validation) => (
          <View key={validation.key} style={styles.validationView}>
            <View style={bulletStyle(validations[validation.key])}></View>
            <CommonText
              customTextStyle={styles.bulletText}
              title={intl.formatMessage({ id: validation.id })}
            />
          </View>
        ))}
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
