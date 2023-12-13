import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View, TouchableOpacity } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./CustomToggleComponent.style";

const CustomToggleComponent = () => {
  const [selectedToggleOption, setSelectedToggleOption] = useState(2);
  const intl = useIntl();
  const handleOptionSelect = (option) => {
    setSelectedToggleOption(option);
  };

  return (
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
  );
};

export default CustomToggleComponent;
