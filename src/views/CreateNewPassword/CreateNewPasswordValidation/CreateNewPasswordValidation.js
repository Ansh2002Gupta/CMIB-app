import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import { VALIDATION_TYPE } from "../../../constants/constants";
import colors from "../../../assets/colors";
import styles from "./CreateNewPasswordValidation.style";

const CreateNewPasswordValidation = ({
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

CreateNewPasswordValidation.propTypes = {
  confirmNewPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  customContainerStyles: PropTypes.object,
  validations: PropTypes.object.isRequired,
  setValidations: PropTypes.func.isRequired,
};

export default CreateNewPasswordValidation;
