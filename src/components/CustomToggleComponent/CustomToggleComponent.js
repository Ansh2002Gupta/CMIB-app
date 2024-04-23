import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import { RADIO_BUTTON_OPTIONS } from "../../constants/constants";
import styles from "./CustomToggleComponent.style";

const CustomToggleComponent = ({
  customLabelStyle,
  customLabelViewStyle,
  customToggleStyle,
  customToggleButtonTextStyle,
  customErrorStyle,
  isMandatory,
  errorMessage,
  containerStyle,
  label,
  onValueChange,
  options,
  value,
}) => {
  const [selectedToggleOption, setSelectedToggleOption] = useState(value ?? -1);
  useEffect(() => {
    if (typeof value !== "undefined") {
      setSelectedToggleOption(value);
    }
  }, [value]);
  const { isWebView } = useIsWebView();

  useEffect(() => {
    if (selectedToggleOption !== value) {
      setSelectedToggleOption(value);
    }
  }, [value]);

  const handleOptionSelect = (option) => {
    if (onValueChange) {
      onValueChange(option);
    }
    setSelectedToggleOption(option);
  };

  useEffect(() => {
    selectedToggleOption != -1 && onValueChange(selectedToggleOption);
  }, [selectedToggleOption]);

  return (
    <View style={containerStyle}>
      {label && (
        <View style={styles.labelContainer}>
          <CommonText
            customTextStyle={[
              styles.label,
              isWebView && styles.webLabel,
              customLabelStyle,
            ]}
          >
            {label}
          </CommonText>
          {isMandatory && (
            <CommonText customTextStyle={[styles.label, styles.starStyle]}>
              {"*"}
            </CommonText>
          )}
        </View>
      )}
      <View style={[styles.mainView, customToggleStyle]}>
        {!!options.length &&
          options.map((option, index) => (
            <>
              <TouchableOpacity
                key={index}
                style={{
                  ...styles.yesButtonStyle,
                  ...(selectedToggleOption === index
                    ? styles.activeButtonStyle
                    : null),
                }}
                onPress={() => handleOptionSelect(index)}
              >
                <View
                  style={{
                    ...styles.buttonViewStyle,
                    ...(selectedToggleOption === index
                      ? styles.activeButtonViewStyle
                      : null),
                  }}
                />
              </TouchableOpacity>
              <CommonText
                customTextStyle={[
                  styles.textStyle,
                  selectedToggleOption === index,
                  customToggleButtonTextStyle,
                ]}
              >
                {option}
              </CommonText>
            </>
          ))}
      </View>
      {!!errorMessage && (
        <CommonText
          customTextStyle={[styles.errorMsg, customErrorStyle]}
          fontWeight={customErrorStyle?.fontWeight || "600"}
        >
          {errorMessage}
        </CommonText>
      )}
    </View>
  );
};

CustomToggleComponent.defaultProps = {
  onValueChange: () => {},
  customToggleButtonTextStyle: {},
  options: RADIO_BUTTON_OPTIONS,
};

CustomToggleComponent.propTypes = {
  customLabelStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  customToggleButtonTextStyle: PropTypes.object,
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
  onValueChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default CustomToggleComponent;
