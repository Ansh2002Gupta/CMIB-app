import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View, TouchableOpacity } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./CustomToggleComponent.style";

const CustomToggleComponent = ({
  customLabelStyle,
  containerStyle,
  customToggleStyle,
  isMandatory,
  label,
  onValueChange,
  toggleTitle1,
  toggleTitle2,
  value,
}) => {
  const [selectedToggleOption, setSelectedToggleOption] = useState(value ?? -1);
  const intl = useIntl();
  const handleOptionSelect = (option) => {
    if (onValueChange) {
      onValueChange(option);
    }
    setSelectedToggleOption(option);
  };
  const { isWebView } = useIsWebView();

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
        <TouchableOpacity
          style={{
            ...styles.yesButtonStyle,
            ...(value === 1 ? styles.activeButtonStyle : null),
          }}
          onPress={() => handleOptionSelect(1)}
        >
          <View
            style={{
              ...styles.buttonViewStyle,
              ...(value === 1 ? styles.activeButtonViewStyle : null),
            }}
          />
        </TouchableOpacity>
        <CommonText customTextStyle={styles.textStyle}>
          {toggleTitle1
            ? toggleTitle1
            : intl.formatMessage({
                id: "label.yes",
              })}
        </CommonText>
        <TouchableOpacity
          style={{
            ...styles.noButtonStyle,
            ...(value === 0 ? styles.activeButtonStyle : null),
          }}
          onPress={() => handleOptionSelect(0)}
        >
          <View
            style={{
              ...styles.buttonViewStyle,
              ...(value === 0 ? styles.activeButtonViewStyle : null),
            }}
          />
        </TouchableOpacity>
        <CommonText customTextStyle={styles.textStyle}>
          {toggleTitle2
            ? toggleTitle2
            : intl.formatMessage({
                id: "label.no",
              })}
        </CommonText>
      </View>
    </View>
  );
};

CustomToggleComponent.defaultProps = {
  value: 1,
  onValueChange: () => {},
};

CustomToggleComponent.propTypes = {
  customLabelStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
  onValueChange: PropTypes.func,
  toggleTitle1: PropTypes.string,
  toggleTitle2: PropTypes.string,
  value: PropTypes.string,
};

export default CustomToggleComponent;
