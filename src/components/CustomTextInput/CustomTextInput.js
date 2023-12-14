import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import Dropdown from "../Dropdown/index";
import images from "../../images";
import colors from "../../assets/colors";
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
    inputKey = "value",
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
        <CommonText
          customTextStyle={[
            style.label,
            isWebView && style.webLabel,
            customLabelStyle,
          ]}
          title={label}
        />
        {isMandatory && (
          <CommonText
            customTextStyle={[style.label, style.starStyle]}
            title={"*"}
          />
        )}
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
            onChangeValue(item[inputKey]);
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
              <CommonText customTextStyle={style.prefixStyle} title={+91} />
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
      {isError && (
        <CommonText customTextStyle={style.errorMsg} title={errorMessage} />
      )}
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
  placeholder: PropTypes.string,
  dropdownStyle: PropTypes.object,
  eyeImage: PropTypes.bool,
  isPassword: PropTypes.bool,
  customLabelStyle: PropTypes.object,
  customTextInputContainer: PropTypes.object,
};

export default CustomTextInput;
