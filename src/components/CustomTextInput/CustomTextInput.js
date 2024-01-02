import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CustomLabelView from "../CustomLabelView";
import CounterInput from "../CounterInput";
import CommonText from "../CommonText";
import Dropdown from "../Dropdown/index";
import TextInput from "../TextInput";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import colors from "../../assets/colors";
import style from "./CustomTextInput.style";

const CustomTextInput = (props) => {
  const {
    customErrorStyle,
    countValue,
    customLabelStyle,
    customStyle,
    customHandleBlur,
    customTextInputContainer,
    dropdownStyle,
    errorMessage,
    eyeImage,
    handleCountChange,
    isCounterInput,
    isDropdown,
    isError,
    isMandatory,
    isMobileNumber,
    isMultiline,
    isPaddingNotRequired,
    isPassword,
    label,
    maxCount = 100,
    minCount = 0,
    options,
    onChangeValue,
    placeholder,
    step = 1,
    value,
    inputKey = "value",
    ...remainingProps
  } = props;

  const { isWebView } = useIsWebView();
  const [isFocused, setIsFocused] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    customHandleBlur();
    setIsFocused(false);
  };

  const platformSpecificProps = Platform.select({
    web: {},
    default: {
      placeholderTextColor: colors.darkGrey,
    },
  });

  return (
    <View
      style={
        !isPaddingNotRequired ? [style.container, customStyle] : customStyle
      }
    >
      {!!label && <CustomLabelView label={label} isMandatory />}
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
      ) : isCounterInput ? (
        <CounterInput
          initialCount={countValue}
          minCount={minCount}
          maxCount={maxCount}
          onCountChange={handleCountChange}
          step={step}
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
            multiline={isMultiline || undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            secureTextEntry={isPassword && !isTextVisible}
            {...platformSpecificProps}
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
        <CommonText
          customTextStyle={[style.errorMsg, customErrorStyle]}
          title={errorMessage}
        />
      )}
    </View>
  );
};

CustomTextInput.defaultProps = {
  customErrorStyle: {},
  customHandleBlur: () => {},
  customLabelStyle: {},
  customStyle: {},
  customTextInputContainer: {},
  dropdownStyle: {},
  errorMessage: "",
  eyeImage: false,
  isCounterInput: false,
  isDropdown: false,
  isError: false,
  isMandatory: false,
  isMobileNumber: false,
  isMultiline: false,
  isPaddingNotRequired: false,
  isPassword: false,
  inputKey: "value",
  label: "",
  placeholder: "",
  value: "",
};

CustomTextInput.propTypes = {
  customErrorStyle: PropTypes.object,
  customHandleBlur: PropTypes.func,
  customLabelStyle: PropTypes.object,
  customStyle: PropTypes.object,
  customTextInputContainer: PropTypes.object,
  dropdownStyle: PropTypes.object,
  errorMessage: PropTypes.string,
  eyeImage: PropTypes.bool,
  isCounterInput: PropTypes.bool,
  isDropdown: PropTypes.bool,
  isError: PropTypes.bool,
  isMandatory: PropTypes.bool,
  isMobileNumber: PropTypes.bool,
  isMultiline: PropTypes.bool,
  isPaddingNotRequired: PropTypes.bool,
  isPassword: PropTypes.bool,
  inputKey: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomTextInput;
