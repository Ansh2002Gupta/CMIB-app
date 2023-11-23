import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "@unthinkable/react-core-components";
import styles from "./CustomTextInput.style";
import { useTheme } from "@unthinkable/react-theme";
import colors from "../../assets/colors";

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  eyeImage,
  errorMessage,
  isPassword,
}) => {
  const icons = useTheme("icons");
  const [isTextVisible, setIsTextVisible] = useState(false);
  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{label}</Text>
      <View style={styles.textInputView}>
        <TextInput
          style={[
            styles.input,
            styles.textInputView,
            {
              borderColor: errorMessage ? colors.red : colors.lightGrey,
            },
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? !isTextVisible : null}
        />
        {eyeImage ? (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={toggleTextVisibility}
          >
            <Image source={isTextVisible ? icons.eyeSlash : icons.eye} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default CustomTextInput;
