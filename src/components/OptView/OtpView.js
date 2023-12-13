import React, { useState, useRef } from 'react';
import { View, TextInput } from "@unthinkable/react-core-components";
import styles from "./OtpView.style";

const OtpView = () => {
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const inputsRef = useRef(otp.map(() => React.createRef()));

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const onKeyPress = ({ nativeEvent: { key: keyValue } }, index) => {
    if (keyValue === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = ''; // Clear the previous box
      setOtp(newOtp);
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    // Combine all OTP digits
    const otpCode = otp.join('');
    // Submit OTP code
    console.log(`OTP Code: ${otpCode}`);
    // Here you would usually call an API to verify the OTP
  };

  const renderInputs = () => {
    return otp.map((item, index) => (
      <TextInput
        key={index}
        ref={(input) => {
          inputsRef.current[index] = input;
        }}
        style={styles.otpBox}
        value={otp[index]}
        onChangeText={(text) => handleOtpChange(text, index)}
        onKeyPress={(e) => onKeyPress(e, index)}
        keyboardType="numeric"
        maxLength={1}
        returnKeyType="done"
        textContentType="oneTimeCode"
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>{renderInputs()}</View>
    </View>
  );
};



export default OtpView;