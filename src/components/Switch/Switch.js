import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import { styles } from "./Switch.style";

const Switch = ({ disabled, isToggled, onChange }) => {
  const handleChange = () => {
    if (disabled) {
      return;
    }
    onChange && onChange();
  };

  return (
    <View style={styles.switch} onPress={() => handleChange()}>
      <View
        style={{
          ...styles.slider,
          ...(isToggled ? styles.sliderActive : {}),
          ...(disabled ? styles.disabled : {}),
        }}
      >
        <View
          style={{
            ...styles.sliderBall,
            ...(isToggled ? styles.sliderBallActive : {}),
          }}
        ></View>
      </View>
    </View>
  );
};

Switch.propTypes = {
  isToggled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Switch;
