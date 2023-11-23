import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Image,
  TextInput,
} from "@unthinkable/react-core-components";
import { Dropdown } from "react-native-element-dropdown";
import style from "./Input.style";
import colors from "../../assets/colors";
import images from "../../images";

const Input = (props) => {
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
    ...remainingProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setShowDropdown(false);
  };

  return (
    <View style={style.container}>
      <View style={style.labelContainer}>
        <Text style={style.label}>{label}</Text>
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
            setValue(item.value);
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
            style={style.textInputStyle}
            multiline={isMultiline}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={colors.darkGrey}
            placeholder={placeholder}
            {...remainingProps}
          />
        </View>
      )}
      {isError && <Text style={style.errorMsg}>{errorMessage}</Text>}
    </View>
  );
};

Input.propTypes = {
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
};

export default Input;
