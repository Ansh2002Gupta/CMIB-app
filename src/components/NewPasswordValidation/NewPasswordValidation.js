import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import {
  isStringContainsNumber,
  isStringContainsUppercase,
  isStringContainsLowercase,
  isStringContainsSpecialChar,
  isStringLengthValid,
} from "../../utils/validation";
import { VALIDATION_TYPE } from "../../constants/constants";
import styles from "./NewPasswordValidation.style";

const NewPasswordValidation = ({
  confirmNewPassword,
  customContainerStyles,
  newPassword,
}) => {
  const intl = useIntl();
  const bulletStyle = (isValid) => [
    styles.bulletIconStyle,
    styles.activityBulletStyle(isValid),
  ];

  const currentValidations = {
    length: isStringLengthValid(newPassword),
    numeric: isStringContainsNumber(newPassword),
    uppercase: isStringContainsUppercase(newPassword),
    lowercase: isStringContainsLowercase(newPassword),
    specialChar: isStringContainsSpecialChar(newPassword),
    match: newPassword === confirmNewPassword,
  };

  return (
    <View>
      <CommonText customTextStyle={styles.validationText}>
        {intl.formatMessage({ id: "label.password_requirment_text" })}
      </CommonText>
      <View style={customContainerStyles}>
        {VALIDATION_TYPE.map((validation) => (
          <View key={validation.key} style={styles.validationView}>
            <View
              style={
                newPassword.length
                  ? bulletStyle(currentValidations[validation.key])
                  : styles.handleBulletColor
              }
            ></View>
            <CommonText customTextStyle={styles.bulletText}>
              {intl.formatMessage({ id: validation.id })}
            </CommonText>
          </View>
        ))}
      </View>
    </View>
  );
};

NewPasswordValidation.propTypes = {
  confirmNewPassword: PropTypes.string.isRequired,
  customContainerStyles: PropTypes.object,
  newPassword: PropTypes.string.isRequired,
};

export default NewPasswordValidation;
