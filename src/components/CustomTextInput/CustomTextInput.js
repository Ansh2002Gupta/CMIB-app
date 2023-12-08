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
    ...remainingProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={style.container}>
      <View style={style.labelContainer}>
        <Text style={[style.label, isWebView && style.webLabel, customLabelStyle]}>{label}</Text>
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
          data={data}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={placeholder || ""}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(item) => {
            // setValue(item.value); Ask Kashish about this state
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
            style={[style.textInputStyle, isMultiline && style.textAlignStyle, isWebView && style.webLabel, customTextInputContainer]}
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
  isMandatory: PropTypes.bool,
  isDropdown: PropTypes.bool,
  isMultiline: PropTypes.bool,
  isMobileNumber: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  dropdownStyle: PropTypes.object,
};

export default CustomTextInput;
