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
import TextInput from "../TextInput";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import colors from "../../assets/colors";
import style from "./CustomTextInput.style";

const CustomTextInput = (props) => {
  const {
    customErrorStyle,
    customHandleBlur,
    customLabelStyle,
    customStyle,
    customTextInputContainer,
    countValue,
    dropdownStyle,
    dropDownModal,
    errorMessage,
    eyeImage,
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
    customHandleBlur();
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
    ...style.inputContainer,
    ...(isFocused ? style.focusedStyle : {}),
    ...(isError ? style.invalidInput : {}),
  };

  const renderTextInput = () => {
    if (dropDownModal) {
      return (
        <DropDownModal
          value={value}
          placeholder={placeholder}
          options={options}
          labelField={labelField}
          valueField={valueField}
          onChangeValue={(item) => {
            onChangeValue(item);
          }}
        />
      );
    }
    if (isDropdown) {
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
          data={options}
          maxHeight={200}
          labelField={labelField}
          valueField={valueField}
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
          <View style={style.prefixContainer}>
            <CommonText customTextStyle={style.prefixStyle}>{"+91"}</CommonText>
            <Image source={images.iconDownArrow} style={style.iconStyle} />
            <Image source={images.iconDivider} style={style.iconStyle} />
          </View>
        )}
        {isRupee && !!value && (
          <View style={style.prefixContainer}>
            <CommonText customTextStyle={style.prefixStyle}>{"₹"}</CommonText>
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
          {...(isNumeric ? mobileProps : {})}
          {...remainingProps}
        />
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
  customErrorStyle: {},
  customHandleBlur: () => {},
  customLabelStyle: {},
  customStyle: {},
  customTextInputContainer: {},
  dropdownStyle: {},
  dropDownModal: false,
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
};

CustomTextInput.propTypes = {
  countValue: PropTypes.number,
  customErrorStyle: PropTypes.object,
  customHandleBlur: PropTypes.func,
  customLabelStyle: PropTypes.object,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customTextInputContainer: PropTypes.object,
  dropdownStyle: PropTypes.object,
  dropDownModal: PropTypes.bool,
  errorMessage: PropTypes.string,
  eyeImage: PropTypes.bool,
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
  minCount: PropTypes.number,
  onChangeValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueField: PropTypes.string,
};

export default CustomTextInput;
