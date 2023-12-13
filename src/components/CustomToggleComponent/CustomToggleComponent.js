import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View, TouchableOpacity } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./CustomToggleComponent.style";

const CustomToggleComponent = () => {
  const [selectedOption, setSelectedOption] = useState(2);
  const intl = useIntl();
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={{
          ...styles.buttonStyle,
          ...(selectedOption === 0 ? styles.activeButtonStyle : null),
        }}
        onPress={() => handleOptionSelect(0)}
      >
        <View
          style={{
            ...styles.viewStyle,
            ...(selectedOption === 0 ? styles.activeViewStyle : null),
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
          ...(selectedOption === 1 ? styles.activeButtonStyle : null),
        }}
        onPress={() => handleOptionSelect(1)}
      >
        <View
          style={{
            ...styles.viewStyle,
            ...(selectedOption === 1 ? styles.activeViewStyle : null),
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
