import React, { useEffect, useState } from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import getStyles from "./Switch.style";

const Switch = ({ disabled, isToggled, onChange }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [isToggledOn, setIsToggleOn] = useState(false);
  useEffect(() => {
    setIsToggleOn(isToggled);
  }, [isToggled]);
  const handleChange = () => {
    if (disabled) {
      return;
    }
    onChange();
  };

  return (
    <View style={styles.switch} onPress={() => handleChange()}>
      <View
        style={{
          ...styles.slider,
          ...(isToggledOn ? styles.sliderActive : {}),
          ...(disabled ? styles.disabled : {}),
        }}
      >
        <View
          style={{
            ...styles.sliderBall,
            ...(isToggledOn ? styles.sliderBallActive : {}),
          }}
        ></View>
      </View>
    </View>
  );
};

Switch.defaultProps = {
  disabled: false,
  isToggled: false,
  onChange: () => {},
};

Switch.propTypes = {
  disabled: PropTypes.bool,
  isToggled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Switch;
