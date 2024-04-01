import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View, TouchableOpacity } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./CustomToggleComponent.style";

const CustomToggleComponent = ({
  customLabelStyle,
  customToggleStyle,
  isMandatory,
  label,
  onChange,
  value,
}) => {
  const intl = useIntl();
  const handleOptionSelect = (option) => {
    onChange(option);
  };
  const { isWebView } = useIsWebView();

  return (
    <View>
      {!!label && (
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
          {intl.formatMessage({ id: "label.yes" })}
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
          {intl.formatMessage({ id: "label.no" })}
        </CommonText>
      </View>
    </View>
  );
};

CustomToggleComponent.defaultProps = {
  value: 1,
  onChange: () => {},
};

CustomToggleComponent.propTypes = {
  customLabelStyle: PropTypes.object,
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
};

export default CustomToggleComponent;
