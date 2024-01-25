import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { View, Platform } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import SvgUri from "../SvgUri";
import { styles } from "./MobileNumberInput.style";

const MobileNumberInput = ({
  codeError,
  codeValue,
  customHandleBlur,
  labelField,
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

  const menuOptions = options?.map((option) => ({
    value: String(option[valueField]),
    label: (
      <View style={styles.selectedView}>
        {urlField && (
          <SvgUri
            source={{
              uri: option[urlField],
            }}
            style={styles.iconStyles}
          />
        )}
        <CommonText style={styles.labelField}>{option[labelField]}</CommonText>
      </View>
    ),
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
              onChangeValue={(val) => onChangeCode(val)}
              menuOptions={menuOptions}
              placeholder={intl.formatMessage({
                id: "label.select",
              })}
              value={codeValue}
            />
          </View>
          <View style={styles.numberInputStyle}>
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.mobile_number",
              })}
              maxLength={15}
              placeholder={intl.formatMessage({
                id: "label.enter_contact_person_mobile_no",
              })}
              customHandleBlur={customHandleBlur}
              value={mobNumberValue}
              errorMessage={mobNumberError}
              isError={!!mobNumberError}
              isNumeric
              onChangeText={(val) => onChangeMobNumber(val)}
              isMandatory
            />
          </View>
        </View>
      ) : (
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.mobile_number",
          })}
          placeholder={intl.formatMessage({
            id: "label.enter_contact_person_mobile_no",
          })}
          codeValue={codeValue}
          value={mobNumberValue}
          maxLength={15}
          customHandleBlur={customHandleBlur}
          isNumeric
          onChangeText={(val) => onChangeMobNumber(val)}
          isMobileNumber
          errorMessage={mobNumberError}
          isError={!!mobNumberError}
          isMandatory
          options={options}
          onChangeValue={(val) => onChangeCode(val)}
          labelField="dial_code"
          valueField="dial_code"
          urlField="flag"
          inputKey="country_code"
          exclusiveKey={isWeb ? "" : "name"}
        />
      )}
    </>
  );
};

MobileNumberInput.defaultProps = {
  codeError: "",
  codeValue: "",
  customHandleBlur: () => {},
  labelField: "dial_code",
  onChangeCode: () => {},
  onChangeMobNumber: () => {},
  options: [],
  mobNumberError: "",
  mobNumberValue: "",
  urlField: "flag",
  valueField: "dial_code",
};

MobileNumberInput.propTypes = {
  codeError: PropTypes.string,
  codeValue: PropTypes.string,
  customHandleBlur: PropTypes.func,
  onChangeCode: PropTypes.func,
  onChangeMobNumber: PropTypes.func,
  options: PropTypes.array,
  mobNumberError: PropTypes.string,
  mobNumberValue: PropTypes.string,
};

export default MobileNumberInput;
