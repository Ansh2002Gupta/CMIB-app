import React from "react";
import PropTypes from "prop-types";
import { View, Platform } from "@unthinkable/react-core-components";
import CustomTextInput from "../CustomTextInput";
import { useIntl } from "react-intl";
import { styles } from "./MobileNumberInput.style";

const MobileNumberInput = ({
  codeError,
  codeValue,
  customHandleBlur,
  onChangeCode,
  onChangeMobNumber,
  options,
  mobNumberError,
  mobNumberValue,
}) => {
  const isWeb = Platform.OS === "web";
  const intl = useIntl();
  return (
    <View style={styles.inputContainer}>
      <View style={styles.codeInputStyle}>
        <CustomTextInput
          label={intl.formatMessage({
            id: "label.country_code",
          })}
          dropdownStyle={{}}
          placeholder={intl.formatMessage({
            id: "label.select",
          })}
          errorMessage={codeError}
          isError={!!codeError}
          value={codeValue}
          options={options}
          isMandatory
          onChangeValue={(val) => onChangeCode(val)}
          labelField="dial_code"
          valueField="dial_code"
          inputKey="country_code"
          exclusiveKey={isWeb ? "" : "name"}
          isDropdown
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
  );
};

MobileNumberInput.defaultProps = {
  codeError: "",
  codeValue: "",
  customHandleBlur: () => {},
  onChangeCode: () => {},
  onChangeMobNumber: () => {},
  options: [],
  mobNumberError: "",
  mobNumberValue: "",
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
