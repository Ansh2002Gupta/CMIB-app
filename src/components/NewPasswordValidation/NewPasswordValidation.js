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
} from "../../constants/validation";
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
      <CommonText
        customTextStyle={styles.validationText}
        title={intl.formatMessage({ id: "label.password_requirment_text" })}
      />
      <View style={customContainerStyles}>
        {VALIDATION_TYPE.map((validation) => (
          <View key={validation.key} style={styles.validationView}>
            <View
              style={bulletStyle(currentValidations[validation.key])}
            ></View>
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
  customContainerStyles: PropTypes.object,
  newPassword: PropTypes.string.isRequired,
};

export default NewPasswordValidation;
