import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View, TouchableOpacity } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./CustomToggleComponent.style";

const CustomToggleComponent = ({ customLabelStyle, isMandatory, label }) => {
  const [selectedToggleOption, setSelectedToggleOption] = useState(2);
  const intl = useIntl();
  const handleOptionSelect = (option) => {
    setSelectedToggleOption(option);
  };
  const { isWebView } = useIsWebView();

  return (
    <View>
      <View style={styles.labelContainer}>
        <CommonText
          customTextStyle={[
            styles.label,
            isWebView && styles.webLabel,
            customLabelStyle,
          ]}
          title={label}
        />
        {isMandatory && (
          <CommonText
            customTextStyle={[styles.label, styles.starStyle]}
            title={"*"}
          />
        )}
      </View>

      <View style={styles.mainView}>
        <TouchableOpacity
          style={{
            ...styles.yesButtonStyle,
            ...(selectedToggleOption === 0 ? styles.activeButtonStyle : null),
          }}
          onPress={() => handleOptionSelect(0)}
        >
          <View
            style={{
              ...styles.buttonViewStyle,
              ...(selectedToggleOption === 0
                ? styles.activeButtonViewStyle
                : null),
            }}
          />
        </TouchableOpacity>
        <CommonText
          title={intl.formatMessage({ id: "label.yes" })}
          customTextStyle={styles.textStyle}
        />
        <TouchableOpacity
          style={{
            ...styles.noButtonStyle,
            ...(selectedToggleOption === 1 ? styles.activeButtonStyle : null),
          }}
          onPress={() => handleOptionSelect(1)}
        >
          <View
            style={{
              ...styles.buttonViewStyle,
              ...(selectedToggleOption === 1
                ? styles.activeButtonViewStyle
                : null),
            }}
          />
        </TouchableOpacity>
        <CommonText
          title={intl.formatMessage({ id: "label.no" })}
          customTextStyle={styles.textStyle}
        />
      </View>
    </View>
  );
};

CustomToggleComponent.propTypes = {
  customLabelStyle: PropTypes.object,
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
};

export default CustomToggleComponent;
