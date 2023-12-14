import React, { useState, useRef, useContext, useEffect } from 'react';
import { MediaQueryContext } from "@unthinkable/react-theme";
import { View, TextInput, Text, } from "@unthinkable/react-core-components";
import styles from "./OtpComponent.style";

const OtpComponent = (props) => {

  const {
    label,
    onOtpChange,
    onOtpReceived, 
    isMandatory,
    customLabelStyle,
    isError,
    errorMessage,
  } = props;


  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";


  const [activeInputIndex, setActiveInputIndex] = useState(null);


  const [otp, setOtp] = useState(new Array(4).fill(''));
  const inputsRef = useRef(otp.map(() => React.createRef()));

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Call the callback function provided by the parent
    if (onOtpChange) {
      onOtpChange(newOtp.join(''));
    }

    if (text && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };


  useEffect(() => {
    if (onOtpReceived) {
      simulateOtpReceive(onOtpReceived);
    }
  }, [onOtpReceived]);

  
  const simulateOtpReceive = (receivedOtp) => {
    if (receivedOtp.length === otp.length) {
      const newOtp = receivedOtp.split('');
      setOtp(newOtp);
      if (onOtpChange) {
        onOtpChange(receivedOtp);
      }
      inputsRef.current[otp.length - 1].focus();
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
    <View style={styles.containerParent}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text
            style={[styles.label, isWebView && styles.webLabel, customLabelStyle]}
          >
            {label}
          </Text>
          {isMandatory && <Text style={[styles.label, styles.starStyle]}> *</Text>}
        </View>
        <View style={styles.otpContainer}>
          {renderInputs()}
        </View>
        {isError && <Text style={styles.errorMsg}>{errorMessage}</Text>}
      </View>
    </View>
  );
};



export default OtpComponent;