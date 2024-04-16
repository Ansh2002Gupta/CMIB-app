import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import styles from "./Slider.module.css";

const Slider = ({
  isTrackBgGreen,
  maximumValue,
  minimumValue,
  onChange,
  step,
  value,
}) => {
  return (
    <View className={styles["controls"]}>
      <input
        type="range"
        value={value}
        min={minimumValue || 1}
        max={maximumValue || 3}
        step={step || 0.1}
        aria-labelledby="Label"
        onChange={(e) => {
          onChange(+e.target.value);
        }}
        className={`${isTrackBgGreen ? styles.greenTrack : ""} ${
          styles["range"]
        }`}
      />
    </View>
  );
};

Slider.defaultProps = {
  isTrackBgGreen: false,
  maximumValue: 3,
  minimumValue: 1,
  onChange: () => {},
  step: 0.1,
  value: 1,
};

Slider.propTypes = {
  isTrackBgGreen: PropTypes.bool,
  maximumValue: PropTypes.number,
  minimumValue: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number,
  value: PropTypes.number,
};

export default Slider;
