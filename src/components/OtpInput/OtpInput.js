import React, { useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import TextInput from "../TextInput";
import useIsWebView from "../../hooks/useIsWebView";
import { numericValidator } from "../../../src/utils/validation";
import styles from "./OtpInput.style";

const OtpInput = ({
  customLabelStyle,
  errorMessage,
  isError,
  isMandatory,
  label,
  onOtpChange,
}) => {
  const { isWebView } = useIsWebView();
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputsRef = useRef(otp.map(() => React.createRef()));
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (onOtpChange) {
      onOtpChange(newOtp.join(""));
    }
    if (text && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleInputFocus = (index) => {
    setActiveInputIndex(index);
  };

  const handleInputBlur = () => {
    setActiveInputIndex(null);
  };

  const onKeyPress = ({ nativeEvent: { key: keyValue } }, index) => {
    if (keyValue === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  const onKeyUp = useCallback(
    (e, index) => {
      const { key } = e;
      if (key === "Backspace" && !otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputsRef.current[index - 1].focus();
      }
    },
    [otp]
  );

  const platformSpecificProps = Platform.select({
    web: {
      type: "numeric",
    },
    default: {
      keyboardType: "numeric",
      returnKeyType: "done",
      textContentType: "oneTimeCode",
    },
  });

  const renderInputs = () => {
    return otp.map((item, index) => (
      <TextInput
        key={index}
        ref={(input) => {
          inputsRef.current[index] = input;
        }}
        style={{
          ...styles.otpBox,
          ...(isWebView ? styles.webOtpBox : {}),
          ...(index === activeInputIndex ? styles.activeOtpBox : {}),
        }}
        value={otp[index]}
        onChangeText={(text) =>
          numericValidator(text) && handleOtpChange(text, index)
        }
        onKeyPress={(e) => onKeyPress(e, index)}
        maxLength={1}
        onFocus={() => handleInputFocus(index)}
        onBlur={handleInputBlur}
        onKeyUp={(e) => onKeyUp(e, index)}
        {...platformSpecificProps}
      />
    ));
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <CommonText
            customTextStyle={[
              styles.label,
              isWebView && styles.webLabel,
              customLabelStyle,
            ]}
          >
            {label}
          </CommonText>
          {isMandatory && (
            <CommonText
              customTextStyle={[styles.label, styles.starStyle]}
            >{` *`}</CommonText>
          )}
        </View>
        <View
          style={{
            ...styles.otpContainer,
            ...(isWebView ? styles.webOtpContainer : styles.appOtpContainer),
          }}
        >
          {renderInputs()}
        </View>
        {isError && (
          <CommonText customTextStyle={styles.errorMsg} fontWeight="600">
            {errorMessage}
          </CommonText>
        )}
      </View>
    </View>
  );
};

OtpInput.propTypes = {
  customLabelStyle: PropTypes.object,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isMandatory: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onOtpChange: PropTypes.func.isRequired,
};

export default OtpInput;
