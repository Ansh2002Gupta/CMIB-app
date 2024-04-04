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
    dateFormate,
    errorMessage,
    eyeImage,
    file,
    fieldRef,
    handleCountChange,
    inputKey,
    isCounterInput,
    isDropdown,
    isCalendar,
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
    isSendButton,
    isLoading,
    isSelected,
    indexField,
    indexNumber,
    initiateFileUpload,
    includeAllKeys,
    label,
    label2,
    maxCount,
    maxLength,
    minCount,
    menuOptions,
    minDate,
    minTime,
    maxDate,
    maxTime,
    options,
    onChangeValue,
    onClickAttachement,
    onClickSend,
    onIconClose,
    onChangeDropDownText,
    placeholder,
    showTimeSelect,
    step,
    selectedItems,
    setFile,
    selectAllField,
    timeFormat,
    value,
    labelField,
    valueField,
    urlField,
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
            includeAllKeys={includeAllKeys}
            customHandleBlur={customHandleBlur}
            selectAllField={selectAllField}
            onChangeDropDownText={onChangeDropDownText}
            dropdownStyle={{
              ...style.dropdown,
              ...(isFocused ? style.focusedStyle : {},
              isError ? style.invalidInput : {}),
              ...dropdownStyle,
            }}
            selectedTextStyle={style.valueStyle}
            renderRightIcon={() => <Image source={images.iconDownArrow} />}
            placeholderStyle={style.placeholderStyle}
            menuOptions={menuOptions}
            data={options}
            maxHeight={200}
            handleMultiSelect={handleMultiSelect}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder || ""}
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
            customHandleBlur,
            options,
            includeAllKeys,
            selectAllField,
            placeholder,
            selectedItems,
            urlField,
            value,
            valueField,
            onChangeDropDownText,
            isEditable,
          }}
          dropdownStyle={{
            ...style.dropdown,
            ...(isFocused ? style.focusedStyle : {},
            isError ? style.invalidInput : {}),
            ...dropdownStyle,
          }}
        />
      );
    }
    if (isCalendar) {
      return (
        <DatePickerModal
          {...{
            customStyles: customStyle,
            value,
            onChangeValue,
            maxDate,
            minDate,
            showTimeSelect,
            timeFormate: timeFormat,
            format: dateFormate,
            minTime,
            maxTime,
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
          style={isError ? style.invalidInput : {}}
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
      {!!label && (
        <View style={style.innerLabelContainer}>
          <CustomLabelView label={label} isMandatory={isMandatory} />
          {!!label2 && (
            <CommonText customContainerStyle={style.marginRight10}>
              {label2}
            </CommonText>
          )}
        </View>
      )}
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
  includeAllKeys: false,
  initiateFileUpload: () => {},
  label: "",
  label2: "",
  labelField: "label",
  maxCount: 100,
  minCount: 0,
  minDate: "",
  minTime: "",
  maxDate: "",
  maxTime: "",
  options: [],
  onChangeValue: () => {},
  onClickAttachement: () => {},
  onClickSend: () => {},
  onIconClose: () => {},
  placeholder: "",
  step: 1,
  showTimeSelect: false,
  timeFormat: "",
  value: "",
  valueField: "value",
  urlField: "url",
};

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
  includeAllKeys: PropTypes.bool,
  initiateFileUpload: PropTypes.func,
  label: PropTypes.string,
  label2: PropTypes.string,
  labelField: PropTypes.string,
  maxCount: PropTypes.number,
  maxLength: PropTypes.number,
  menuOptions: PropTypes.array,
  minCount: PropTypes.number,
  minDate: PropTypes.string,
  minTime: PropTypes.string,
  maxDate: PropTypes.string,
  maxTime: PropTypes.string,
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
    datePropType,
    PropTypes.array,
  ]),
  valueField: PropTypes.string,
  showTimeSelect: PropTypes.bool,
  timeFormat: PropTypes.string,
  urlField: PropTypes.string,
};

export default CustomTextInput;
