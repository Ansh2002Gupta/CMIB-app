import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { View, Platform } from "@unthinkable/react-core-components";

import CustomTextInput from "../CustomTextInput";
import useIsWebView from "../../hooks/useIsWebView";
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
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  return (
    <>
      {isWebView ? (
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
              urlField="flag"
              inputKey="country_code"
              exclusiveKey={"name"}
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
