import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import styles from "./CustomLoginButton.style";

const CustomLoginButton = ({ label, onPress, disabled }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.buttonView,
          {
            opacity: !disabled ? 1 : 0.5,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.labelView}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomLoginButton;
