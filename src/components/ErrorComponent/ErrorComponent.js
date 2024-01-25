import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomButton from "../CustomButton";
import images from "../../images";
import styles from "./ErrorComponent.style";

const ErrorComponent = ({
  errorMsg,
  onRetry,
  retryButtonText,
  disableRetryBtn,
}) => {
  return (
    <View style={styles.containerStyle}>
      <CommonText fontWeight={"600"} customTextStyle={styles.errorMessage}>
        {errorMsg}
      </CommonText>
      {!!onRetry && (
        <CustomButton
          disabled={disableRetryBtn}
          iconRight={{
            isRightIconNotSvg: true,
            rightIconAlt: "",
            rightIconSource: images.iconRetry,
          }}
          onPress={onRetry}
        >
          {retryButtonText}
        </CustomButton>
      )}
    </View>
  );
};

ErrorComponent.defaultProps = {
  retryButtonText: "Try Again",
  disableRetryBtn: false,
};

ErrorComponent.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  retryButtonText: PropTypes.string,
  disableRetryBtn: PropTypes.bool,
};

export default ErrorComponent;
