import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { View, Platform } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import SvgUri from "../SvgUri";
import { MOBILE_NUMBER_MAX_LENGTH } from "../../constants/constants";
import { styles } from "./MobileNumberInput.style";

const MobileNumberInput = ({
  codeError,
  codeValue,
  customHandleBlur,
  countryNameField,
  fieldRef,
  isEditable,
  labelField,
  mobileFieldLabel,
  mobNumberError,
  mobNumberValue,
  onChangeCode,
  onChangeMobNumber,
  options,
  urlField,
  valueField,
}) => {
  const isWeb = Platform.OS === "web";
  const intl = useIntl();

  const getLabel = (option) => {
    if (isWeb) {
      return (
        <View style={styles.selectedView}>
          {urlField && (
            <SvgUri
              source={{
                uri: option[urlField],
              }}
              style={styles.iconStyles}
            />
          )}
          <CommonText style={styles.labelField}>
            {option[labelField]}
          </CommonText>
        </View>
      );
    }
    return `${String(option[labelField])} (${String(
      option[countryNameField]
    )})`;
  };

  const menuOptions = options?.map((option) => ({
    value: isWeb
      ? `${String(option[labelField])} (${String(option[countryNameField])})`
      : `${String(option[labelField])}`,
    label: getLabel(option),
    url: String(option[urlField]),
  }));

  return (
    <>
      {isWeb ? (
        <View style={styles.inputContainer}>
          <View style={styles.codeInputStyle}>
            <CustomTextInput
              errorMessage={codeError}
              isError={!!codeError}
              label={intl.formatMessage({
                id: "label.country_code",
              })}
              isDropdown
              isMandatory
              isEditable={isEditable}
              onChangeValue={(val) => onChangeCode(val)}
              placeholder={intl.formatMessage({
                id: "label.select",
              })}
              value={codeValue}
              {...{ menuOptions }}
            />
          </View>
          <View style={styles.numberInputStyle}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.mobile_number",
              })}
              maxLength={MOBILE_NUMBER_MAX_LENGTH}
              placeholder={intl.formatMessage({
                id: mobileFieldLabel || "label.enter_contact_person_mobile_no",
              })}
              customHandleBlur={customHandleBlur}
              value={mobNumberValue}
              errorMessage={mobNumberError}
              isError={!!mobNumberError}
              isEditable={isEditable}
              isNumeric
              onChangeText={(val) => onChangeMobNumber(val)}
              isMandatory
              {...{ fieldRef }}
            />
          </View>
        </View>
      ) : (
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.mobile_number",
          })}
          placeholder={intl.formatMessage({
            id: mobileFieldLabel || "label.enter_contact_person_mobile_no",
          })}
          customHeading={intl.formatMessage({
            id: "label.country_codes",
          })}
          value={mobNumberValue}
          maxLength={MOBILE_NUMBER_MAX_LENGTH}
          isNumeric
          onChangeText={(val) => onChangeMobNumber(val)}
          isMobileNumber
          isEditable={isEditable}
          errorMessage={mobNumberError}
          isError={!!mobNumberError}
          isMandatory
          onChangeValue={(val) => onChangeCode(val)}
          labelField="dial_code"
          valueField="dial_code"
          inputKey="country_code"
          {...{ codeValue, customHandleBlur, fieldRef, menuOptions, options }}
        />
      )}
    </>
  );
};

MobileNumberInput.defaultProps = {
  codeError: "",
  codeValue: Platform.OS === "web" ? "+91 (India)" : "+91",
  customHandleBlur: () => {},
  countryNameField: "name",
  labelField: "dial_code",
  onChangeCode: () => {},
  onChangeMobNumber: () => {},
  isEditable: true,
  options: [],
  mobileFieldLabel: "",
  mobNumberError: "",
  mobNumberValue: "",
  urlField: "flag",
  valueField: "dial_code",
};

MobileNumberInput.propTypes = {
  codeError: PropTypes.string,
  codeValue: PropTypes.string,
  customHandleBlur: PropTypes.func,
  countryNameField: PropTypes.string,
  isEditable: PropTypes.bool,
  labelField: PropTypes.string,
  onChangeCode: PropTypes.func,
  onChangeMobNumber: PropTypes.func,
  options: PropTypes.array,
  mobileFieldLabel: PropTypes.string,
  mobNumberError: PropTypes.string,
  mobNumberValue: PropTypes.string,
  urlField: PropTypes.string,
  valueField: PropTypes.string,
};

export default MobileNumberInput;
