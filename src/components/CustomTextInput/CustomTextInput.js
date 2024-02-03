import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CustomLabelView from "../CustomLabelView";
import CounterInput from "../CounterInput";
import CommonText from "../CommonText";
import DropDownModal from "../DropDownModal";
import Dropdown from "../Dropdown/index";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import colors from "../../assets/colors";
import style from "./CustomTextInput.style";

const CustomTextInput = (props) => {
  const {
    customErrorStyle,
    customHandleBlur,
    customHeading,
    customLabelStyle,
    customStyle,
    customTextInputContainer,
    countValue,
    codeValue,
    dropdownStyle,
    errorMessage,
    eyeImage,
    fieldRef,
    handleCountChange,
    inputKey,
    isCounterInput,
    isDropdown,
    isError,
    isMandatory,
    isMobileNumber,
    isMultiline,
    isNumeric,
    isPaddingNotRequired,
    isPassword,
    isRupee,
    label,
    maxCount,
    minCount,
    options,
    onChangeValue,
    placeholder,
    step,
    value,
    labelField,
    valueField,
    urlField,
    menuOptions,
    ...remainingProps
  } = props;

  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const isWebPlatform = Platform.OS === "web";
  const [isFocused, setIsFocused] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    customHandleBlur && customHandleBlur();
    setIsFocused(false);
  };

  const platformSpecificProps = Platform.select({
    web: {},
    default: {
      placeholderTextColor: colors.darkGrey,
    },
  });

  const mobileProps =
    Platform.OS.toLowerCase() !== "web"
      ? { keyboardType: "numeric", returnKeyType: "done" }
      : {};

  const inputStyle = {
    ...(isWebPlatform && isMultiline ? {} : style.inputContainer),
    ...(isFocused ? style.focusedStyle : {}),
    ...(isError ? style.invalidInput : {}),
  };

  const renderTextInput = () => {
    if (isDropdown) {
      if (Platform.OS.toLowerCase() === "web")
        return (
          <Dropdown
            search
            searchPlaceholder={intl.formatMessage({ id: "label.search" })}
            inputSearchStyle={style.searchStyle}
            style={[
              style.dropdown,
              isFocused && style.focusedStyle,
              isError && style.invalidInput,
              dropdownStyle,
            ]}
            selectedTextStyle={style.valueStyle}
            renderRightIcon={() => <Image source={images.iconDownArrow} />}
            placeholderStyle={style.placeholderStyle}
            menuOptions={menuOptions}
            data={options}
            maxHeight={200}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder || ""}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            urlField={urlField}
            onChange={(item) => {
              isWebPlatform
                ? onChangeValue(item)
                : onChangeValue(item[inputKey]);
              setIsFocused(false);
            }}
            {...remainingProps}
          />
        );
      return (
        <DropDownModal
          {...{
            labelField,
            onChangeValue,
            options,
            placeholder,
            value,
            valueField,
          }}
        />
      );
    }
    if (isCounterInput) {
      return (
        <CounterInput
          initialCount={countValue}
          minCount={minCount}
          maxCount={maxCount}
          onCountChange={handleCountChange}
          step={step}
        />
      );
    }
    return (
      <View style={inputStyle}>
        {isMobileNumber && (
          <DropDownModal
            {...{
              codeValue,
              customHeading,
              labelField,
              menuOptions,
              onChangeValue,
              options,
              isMobileNumber,
              placeholder,
              value: codeValue,
              valueField,
              urlField,
            }}
          />
        )}
        {isRupee && !!value && (
          <View style={style.prefixContainer}>
            <CommonText customTextStyle={style.prefixStyle}>{"₹"}</CommonText>
          </View>
        )}
        {isMultiline ? (
          <TextArea
            {...{
              onBlur: handleBlur,
              onChangeText: remainingProps.onChangeText,
              onFocus: handleFocus,
              placeholder,
              value,
            }}
          />
        ) : (
          <TextInput
            value={value}
            style={[
              style.textInputStyle,
              isMultiline && style.textAlignStyle,
              isWebView && style.webLabel,
              customTextInputContainer,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            secureTextEntry={isPassword && !isTextVisible}
            ref={fieldRef}
            {...platformSpecificProps}
            {...(isNumeric ? mobileProps : {})}
            {...remainingProps}
          />
        )}
        {eyeImage && (
          <TouchableOpacity
            style={style.eyeIconContainer}
            onPress={toggleTextVisibility}
          >
            <Image
              source={isTextVisible ? images.iconEyeSlash : images.iconEye}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        ...(!isPaddingNotRequired ? style.container : {}),
        ...customStyle,
      }}
    >
      {!!label && <CustomLabelView label={label} isMandatory={isMandatory} />}
      {renderTextInput()}
      {isError && (
        <CommonText
          customTextStyle={[style.errorMsg, customErrorStyle]}
          fontWeight={customErrorStyle?.fontWeight || "600"}
        >
          {errorMessage}
        </CommonText>
      )}
    </View>
  );
};

CustomTextInput.defaultProps = {
  countValue: 0,
  codeValue: "",
  customErrorStyle: {},
  customHandleBlur: () => {},
  customHeading: "",
  customLabelStyle: {},
  customStyle: {},
  customTextInputContainer: {},
  dropdownStyle: {},
  errorMessage: "",
  eyeImage: false,
  handleCountChange: () => {},
  isCounterInput: false,
  isDropdown: false,
  isError: false,
  inputKey: "value",
  isMandatory: false,
  isMobileNumber: false,
  isMultiline: false,
  isNumeric: false,
  isPaddingNotRequired: false,
  isPassword: false,
  label: "",
  labelField: "label",
  maxCount: 100,
  minCount: 0,
  options: [],
  onChangeValue: () => {},
  placeholder: "",
  step: 1,
  value: "",
  valueField: "value",
  urlField: "url",
};

CustomTextInput.propTypes = {
  countValue: PropTypes.number,
  codeValue: PropTypes.string,
  customErrorStyle: PropTypes.object,
  customHandleBlur: PropTypes.func,
  customHeading: PropTypes.string,
  customLabelStyle: PropTypes.object,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customTextInputContainer: PropTypes.object,
  dropdownStyle: PropTypes.object,
  errorMessage: PropTypes.string,
  eyeImage: PropTypes.bool,
  fieldRef: PropTypes.any,
  handleCountChange: PropTypes.func,
  inputKey: PropTypes.string,
  isCounterInput: PropTypes.bool,
  isDropdown: PropTypes.bool,
  isError: PropTypes.bool,
  isMandatory: PropTypes.bool,
  isMobileNumber: PropTypes.bool,
  isMultiline: PropTypes.bool,
  isNumeric: PropTypes.bool,
  isPaddingNotRequired: PropTypes.bool,
  isPassword: PropTypes.bool,
  label: PropTypes.string,
  labelField: PropTypes.string,
  maxCount: PropTypes.number,
  menuOptions: PropTypes.array,
  minCount: PropTypes.number,
  onChangeValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
  urlField: PropTypes.string,
};

export default CustomTextInput;
