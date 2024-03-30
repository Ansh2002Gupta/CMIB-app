import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomButton from "../CustomButton";
import CustomImage from "../CustomImage";
import images from "../../images";
import styles from "./ErrorComponent.style";

const ErrorComponent = ({
  errorHeading,
  errorMsg,
  onRetry,
  retryButtonText,
  disableRetryBtn,
}) => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.innerContainer}>
        <CustomImage source={images.iconError} style={styles.iconError} />
        <CommonText customTextStyle={styles.errorHeading}>
          {errorHeading}
        </CommonText>
        <CommonText fontWeight={"600"} customTextStyle={styles.errorMessage}>
          {errorMsg}
        </CommonText>
        {!!onRetry && (
          <CustomButton
            disabled={disableRetryBtn}
            style={styles.erroButtonStyle}
            customStyle={{ customTextStyle: styles.buttonText }}
            onPress={onRetry}
          >
            {retryButtonText}
          </CustomButton>
        )}
      </View>
    </View>
  );
};

ErrorComponent.defaultProps = {
  errorHeading: "Error",
  retryButtonText: "Try Again",
  disableRetryBtn: false,
};

ErrorComponent.propTypes = {
  errorHeading: PropTypes.string,
  errorMsg: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  retryButtonText: PropTypes.string,
  disableRetryBtn: PropTypes.bool,
};

export default ErrorComponent;
