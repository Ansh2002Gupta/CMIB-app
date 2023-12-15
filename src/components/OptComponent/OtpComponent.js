import React, { useState, useRef, useContext } from 'react';
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { TextInput, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./OtpComponent.style";

const OtpComponent = (props) => {

  const {
    label,
    onOtpChange,
    isMandatory,
    customLabelStyle,
    isError,
    errorMessage,
  } = props;

  const { isWebView } = useIsWebView();
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const inputsRef = useRef(otp.map(() => React.createRef()));
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (onOtpChange) {
      onOtpChange(newOtp.join(''));
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
    if (keyValue === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  const renderInputs = () => {
    return otp.map((item, index) => (
      <TextInput
        key={index}
        ref={(input) => {
          inputsRef.current[index] = input;
        }}
        style={[
          styles.otpBox,
          index === activeInputIndex ? styles.activeOtpBox : null,
        ]}
        value={otp[index]}
        onChangeText={(text) => handleOtpChange(text, index)}
        onKeyPress={(e) => onKeyPress(e, index)}
        keyboardType="numeric"
        maxLength={1}
        returnKeyType="done"
        textContentType="oneTimeCode"
        onFocus={() => handleInputFocus(index)}
        onBlur={handleInputBlur}
      />
    ));
  };

  return (
    <View >
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <CommonText
            customTextStyle={[styles.label, isWebView && styles.webLabel, customLabelStyle]}
            title={label}
          />
          {isMandatory && <CommonText
            customTextStyle={[styles.label, styles.starStyle]}
            title={` *`}
          />}
        </View>
        <View style={styles.otpContainer}>
          {renderInputs()}
        </View>
        {isError && <CommonText
          customTextStyle={styles.errorMsg}
          title={errorMessage}
        />}
      </View>
    </View>
  );
};

OtpComponent.propTypes = {
  customLabelStyle: PropTypes.object,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isMandatory: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onOtpChange: PropTypes.func.isRequired,
}
export default OtpComponent;