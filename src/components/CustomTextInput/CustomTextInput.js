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
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import DatePickerModal from "../DatePickerModel";
import DropDownModal from "../DropDownModal";
import Dropdown from "../Dropdown/index";
import Spinner from "../Spinner";
import TriggerFileUpload from "../TriggerFileUpload";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import useIsWebView from "../../hooks/useIsWebView";
import { getImageSource } from "../../utils/util";
import images from "../../images";
import colors from "../../assets/colors";
import classes from "../../theme/styles/CssClassProvider";
import style from "./CustomTextInput.style";
import CustomToggleComponent from "../CustomToggleComponent/CustomToggleComponent";
import CheckBoxSelection from "../CheckBoxSelection/CheckBoxSelection";
import TextInputWithChip from "../TextInputWithChip/TextInputWithChip";

const CustomTextInput = (props) => {
  const {
    attachementRef,
    customErrorStyle,
    customHandleBlur,
    customHeading,
    customLabelStyle,
    customStyle,
    customTextInputContainer,
    customTextInputOuterContainer,
    countValue,
    codeValue,
    dropdownStyle,
    errorMessage,
    eyeImage,
    file,
    fieldRef,
    handleCountChange,
    inputKey,
    isCounterInput,
    isDropdown,
    isEditable,
    isError,
    isMandatory,
    handleMultiSelect,
    isMobileNumber,
    isMultiline,
    isMultiSelect,
    isNumeric,
    isPaddingNotRequired,
    isPassword,
    isRupee,
    isToggle,
    isSendButton,
    isLoading,
    isSelected,
    indexField,
    indexNumber,
    initiateFileUpload,
    label,
    maxCount,
    maxLength,
    minCount,
    options,
    onChangeValue,
    onClickAttachement,
    onClickSend,
    onIconClose,
    placeholder,
    step,
    selectedItems,
    setFile,
    value,
    labelField,
    valueField,
    urlField,
    menuOptions,
    isCalendar,
    maxDate,
    minDate,
    isCheckBoxSelection,
    checkBoxOptions,
    handleAddRemoveRow,
    isActionToAdd,
    handleCheckBoxSelection,
    isSingleSelection,
    isTextInputWithChip,
    onChipUpdate,
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
    ...(isWebPlatform && isMultiline
      ? {}
      : { ...style.inputContainer, ...customTextInputOuterContainer }),
    ...(isFocused ? style.focusedStyle : {}),
    ...(isError ? style.invalidInput : {}),
    ...(!isEditable ? style.disabledStyle : {}),
  };

  const webProps = isWebPlatform
    ? { size: "xs", thickness: 3, color: colors.white }
    : {};

  const textInputWebProps = isWebPlatform
    ? { className: classes["input_placeholder"] }
    : {};

  const getSendButtonStatus = () => {
    if (isLoading) {
      return true;
    }
    if (!!file) {
      return false;
    }
    if (!!value) {
      return false;
    }
    if (!!file && !!value) {
      return false;
    }
    return true;
  };

  const buttonStatus = getSendButtonStatus();

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
            handleMultiSelect={handleMultiSelect}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder || "Select"}
            value={value}
            isMultiSelect={isMultiSelect}
            isSelected={isSelected}
            onFocus={handleFocus}
            onBlur={handleBlur}
            selectedItems={selectedItems}
            urlField={urlField}
            indexNumber={indexNumber}
            indexField={indexField}
            onChange={(item) => {
              isWebPlatform
                ? onChangeValue(item)
                : onChangeValue(item[inputKey]);
              setIsFocused(false);
            }}
            isEditable={isEditable}
            {...remainingProps}
          />
        );
      return (
        <DropDownModal
          {...{
            isMultiSelect,
            isSelected,
            indexNumber,
            indexField,
            labelField,
            onChangeValue,
            handleMultiSelect,
            options,
            placeholder,
            selectedItems,
            urlField,
            value,
            valueField,
            isEditable,
          }}
        />
      );
    }
    if (isCalendar) {
      return (
        <DatePickerModal
          value={value}
          onChangeValue={onChangeValue}
          maxDate={maxDate}
          minDate={minDate}
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
    if (isToggle) {
      return (
        <CustomToggleComponent
          isMandatory={isMandatory}
          customToggleStyle={style.customToggleStyle}
          onChange={(item) => {
            onChangeValue(item);
          }}
        />
      );
    }
    if (isCheckBoxSelection) {
      return (
        <CheckBoxSelection
          checkBoxOptions={checkBoxOptions}
          customStyle={style.CheckBoxSelection}
          handleAddRemoveRow={(isActionToAdd) =>
            handleAddRemoveRow(isActionToAdd)
          }
          isActionToAdd={isActionToAdd}
          handleCheckBoxSelection={(id) => handleCheckBoxSelection(id)}
          isSingleSelection={isSingleSelection}
        />
      );
    }
    if (isTextInputWithChip) {
      return (
        <TextInputWithChip
          value={value}
          placeholderText={placeholder}
          onChipUpdate={(chipData) => onChipUpdate(chipData)}
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
              isEditable,
            }}
          />
        )}
        {isRupee && !!value && (
          <View style={style.prefixContainer}>
            <CommonText customTextStyle={style.prefixStyle}>
              {intl.formatMessage({ id: "label.rupee" })}
            </CommonText>
          </View>
        )}
        {isMultiline ? (
          <TextArea
            {...{
              isError,
              maxLength,
              onBlur: handleBlur,
              onChangeText: remainingProps.onChangeText,
              onFocus: handleFocus,
              placeholder,
              ref: fieldRef,
              value,
            }}
          />
        ) : isSendButton ? (
          <View
            style={file ? style.sendButtonWithFiles : style.sendButtonContainer}
          >
            <View style={style.sendButton}>
              <TextInput
                value={value}
                style={[
                  style.textInputStyle,
                  isMultiline && style.textAlignStyle,
                  isWebView && style.webLabel,
                  !isEditable && style.disabledStyle,
                  customTextInputContainer,
                ]}
                editable={isEditable}
                maxLength={maxLength}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                secureTextEntry={isPassword && !isTextVisible}
                ref={fieldRef}
                {...platformSpecificProps}
                {...(isNumeric ? mobileProps : {})}
                {...remainingProps}
                {...textInputWebProps}
              />
              <TriggerFileUpload
                onImageUpload={onClickAttachement}
                initiateFileUpload={initiateFileUpload}
                iconLeft={{
                  leftIconSource: images.iconAttachement,
                  isLeftIconNotSvg: false,
                }}
                shouldShowHover={false}
                customButtonStyle={style.iconAttachment}
                setFile={setFile}
              />
              <CustomTouchableOpacity
                style={!buttonStatus ? style.sendEnabled : style.sendDisabled}
                onPress={onClickSend}
                disabled={buttonStatus}
              >
                {isLoading ? (
                  <Spinner {...webProps} color={"white"} />
                ) : (
                  <CustomImage
                    source={images.iconSendGreen}
                    style={style.iconAttachment}
                  />
                )}
              </CustomTouchableOpacity>
            </View>
            {!!file && (
              <View
                style={style.imageUploadStyleContainer}
                ref={attachementRef}
              >
                <CustomImage
                  source={{
                    uri: isWebPlatform ? getImageSource(file) : file?.uri,
                  }}
                  style={style.imageUploadStyle}
                />
                <CustomTouchableOpacity
                  onPress={onIconClose}
                  style={style.iconCrossContainer}
                >
                  <CustomImage
                    source={images.iconCross}
                    style={style.iconCross}
                  />
                </CustomTouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <TextInput
            value={value}
            style={[
              style.textInputStyle,
              isMultiline && style.textAlignStyle,
              isWebView && style.webLabel,
              customTextInputContainer,
            ]}
            editable={isEditable}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            secureTextEntry={isPassword && !isTextVisible}
            ref={fieldRef}
            type={isNumeric ? "number" : "text"}
            {...platformSpecificProps}
            {...(isNumeric ? mobileProps : {})}
            {...remainingProps}
            {...textInputWebProps}
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
      {(isError || isMultiline) && (
        <View
          style={{
            ...style.errorAndCountLimitBox,
            ...(!isError && isMultiline ? style.onlyCountLimitBox : {}),
          }}
        >
          {isError && (
            <CommonText
              customTextStyle={[style.errorMsg, customErrorStyle]}
              fontWeight={customErrorStyle?.fontWeight || "600"}
            >
              {errorMessage}
            </CommonText>
          )}
          {isMultiline && (
            <CommonText
              customTextStyle={style.limitStyle}
            >{`${value.length}/${maxLength}`}</CommonText>
          )}
        </View>
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
  customTextInputOuterContainer: {},
  dropdownStyle: {},
  errorMessage: "",
  eyeImage: false,
  handleCountChange: () => {},
  isCounterInput: false,
  isDropdown: false,
  isError: false,
  isEditable: true,
  inputKey: "value",
  isMandatory: false,
  isMobileNumber: false,
  isMultiline: false,
  isMultiSelect: false,
  isNumeric: false,
  isPaddingNotRequired: false,
  isPassword: false,
  isSendButton: false,
  initiateFileUpload: () => {},
  label: "",
  labelField: "label",
  maxCount: 100,
  minCount: 0,
  options: [],
  onChangeValue: () => {},
  onClickAttachement: () => {},
  onClickSend: () => {},
  onIconClose: () => {},
  placeholder: "",
  step: 1,
  value: "",
  valueField: "value",
  urlField: "url",
  isCheckBoxSelection: false,
  checkBoxOptions: [],
  handleAddRemoveRow: () => {},
  isActionToAdd: true,
  handleCheckBoxSelection: () => {},
  isSingleSelection: false,
  isTextInputWithChip: false,
  onChipUpdate: () => {},
};
// Custom validator for Date objects
const datePropType = (props, propName, componentName) => {
  if (props[propName] && !(props[propName] instanceof Date)) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed. It needs to be a Date object.`
    );
  }
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
  customTextInputOuterContainer: PropTypes.object,
  dropdownStyle: PropTypes.object,
  errorMessage: PropTypes.string,
  eyeImage: PropTypes.bool,
  fieldRef: PropTypes.any,
  handleCountChange: PropTypes.func,
  inputKey: PropTypes.string,
  isCounterInput: PropTypes.bool,
  isDropdown: PropTypes.bool,
  isEditable: PropTypes.bool,
  isError: PropTypes.bool,
  isMandatory: PropTypes.bool,
  isMobileNumber: PropTypes.bool,
  isMultiline: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  isNumeric: PropTypes.bool,
  isPaddingNotRequired: PropTypes.bool,
  isPassword: PropTypes.bool,
  isSendButton: PropTypes.bool,
  initiateFileUpload: PropTypes.func,
  label: PropTypes.string,
  labelField: PropTypes.string,
  maxCount: PropTypes.number,
  maxLength: PropTypes.number,
  menuOptions: PropTypes.array,
  minCount: PropTypes.number,
  onChangeValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  onClickAttachement: PropTypes.func,
  onClickSend: PropTypes.func,
  onIconClose: PropTypes.func,
  placeholder: PropTypes.string,
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    datePropType,
  ]),
  valueField: PropTypes.string,
  urlField: PropTypes.string,
  CheckBoxSelection: PropTypes.bool,
  checkBoxOptions: PropTypes.array,
  handleAddRemoveRow: PropTypes.func,
  isActionToAdd: PropTypes.bool,
  handleCheckBoxSelection: PropTypes.func,
  isSingleSelection: PropTypes.bool,
  isTextInputWithChip: PropTypes.bool,
  onChipUpdate: PropTypes.func,
};

export default CustomTextInput;
