import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import { Dropdown } from "react-native-element-dropdown";

import colors from "../../assets/colors";
import images from "../../images";
import style from "./CustomTextInput.style";

const CustomTextInput = (props) => {
  const {
    label,
    value,
    isMandatory,
    isDropdown,
    isMultiline,
    isMobileNumber,
    isError,
    errorMessage,
    placeholder,
    dropdownStyle,
    eyeImage,
    isPassword,
    customLabelStyle,
    customTextInputContainer,
    options,
    onChangeValue,
    ...remainingProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={style.container}>
      <View style={style.labelContainer}>
        <Text style={[style.label, customLabelStyle]}>{label}</Text>
        {isMandatory && <Text style={[style.label, style.starStyle]}> *</Text>}
      </View>
      {isDropdown ? (
        <Dropdown
          style={[
            style.dropdown,
            isFocused && style.focusedStyle,
            isError && style.invalidInput,
            dropdownStyle,
          ]}
          renderRightIcon={() => <Image source={images.iconDownArrow} />}
          placeholderStyle={style.placeholderStyle}
          data={options}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={placeholder || ""}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(item) => {
            onChangeValue(item.value);
            setIsFocused(false);
          }}
          {...remainingProps}
        />
      ) : (
        <View
          style={[
            style.inputContainer,
            isFocused && style.focusedStyle,
            isError && style.invalidInput,
          ]}
        >
          {isMobileNumber && (
            <View style={style.prefixContainer}>
              <Text style={style.prefixStyle}>+91</Text>
              <Image source={images.iconDownArrow} style={style.iconStyle} />
              <Image source={images.iconDivider} style={style.iconStyle} />
            </View>
          )}

          <TextInput
            value={value}
            style={[
              style.textInputStyle,
              isMultiline && style.textAlignStyle,
              customTextInputContainer,
            ]}
            multiline={isMultiline}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={colors.darkGrey}
            placeholder={placeholder}
            secureTextEntry={isPassword ? !isTextVisible : null}
            {...remainingProps}
          />
          {eyeImage ? (
            <TouchableOpacity
              style={style.eyeIconContainer}
              onPress={toggleTextVisibility}
            >
              <Image
                source={isTextVisible ? images.iconEyeSlash : images.iconEye}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      )}
      {isError && <Text style={style.errorMsg}>{errorMessage}</Text>}
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isMandatory: PropTypes.bool.isRequired,
  isDropdown: PropTypes.bool.isRequired,
  isMultiline: PropTypes.bool.isRequired,
  isMobileNumber: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  dropdownStyle: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  eyeImage: PropTypes.bool,
  isPassword: PropTypes.bool,
  customLabelStyle: PropTypes.object,
  customTextInputContainer: PropTypes.object,
};

export default CustomTextInput;
