import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import Dropdown from "../Dropdown/index";
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
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

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
        <Text
          style={[style.label, isWebView && style.webLabel, customLabelStyle]}
        >
          {label}
        </Text>
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
              isWebView && style.webLabel,
              customTextInputContainer,
            ]}
            multiline={isMultiline}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={colors.darkGrey}
            placeholder={placeholder}
            secureTextEntry={isPassword && !isTextVisible}
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
  isMandatory: PropTypes.bool,
  isDropdown: PropTypes.bool,
  isMultiline: PropTypes.bool,
  isMobileNumber: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  dropdownStyle: PropTypes.object,
  eyeImage: PropTypes.bool,
  isPassword: PropTypes.bool,
  customLabelStyle: PropTypes.object,
  customTextInputContainer: PropTypes.object,
};

export default CustomTextInput;
