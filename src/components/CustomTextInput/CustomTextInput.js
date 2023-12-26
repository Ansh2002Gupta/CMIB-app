import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import Dropdown from "../Dropdown/index";
import TextInput from "../TextInput";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import colors from "../../assets/colors";
import style from "./CustomTextInput.style";

const CustomTextInput = (props) => {
  const {
    customLabelStyle,
    customStyle,
    customTextInputContainer,
    dropdownStyle,
    errorMessage,
    eyeImage,
    isCounterInput,
    isDropdown,
    isError,
    isMandatory,
    isMobileNumber,
    isMultiline,
    isPassword,
    label,
    options,
    onChangeValue,
    placeholder,
    value,
    onBlur,
    inputKey = "value",
    ...remainingProps
  } = props;

  const [count, setCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const { isWebView } = useIsWebView();
  const isWebPlatform =  Platform.OS === "web";

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur()
    }
  };

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <View style={[style.container, customStyle]}>
      {!!label && (
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
      )}
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
            isWebPlatform ? onChangeValue(item) : onChangeValue(item[inputKey]);
            setIsFocused(false);
          }}
          {...remainingProps}
        />
      ) : isCounterInput ? (
        <View style={style.counterMainView}>
          <View style={style.counterView}>
            <CommonText customTextStyle={style.counterText} title={count} />
          </View>
          <View style={style.buttonsView}>
            <TouchableOpacity onPress={incrementCount} style={style.button}>
              <Image source={images.iconUpArrow} />
            </TouchableOpacity>
            <TouchableOpacity onPress={decrementCount} style={style.button}>
              <Image source={images.iconDownArrow} />
            </TouchableOpacity>
          </View>
        </View>
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

CustomTextInput.defaultProps = {
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
  inputKey: "value",
  isPassword: false,
  label: "",
  placeholder: "",
  value: "",
};

CustomTextInput.propTypes = {
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
  inputKey: PropTypes.string,
  isPassword: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default CustomTextInput;
