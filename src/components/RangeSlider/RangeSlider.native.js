import React, { useCallback } from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import Label from "./Helpers/Label";
import Notch from "./Helpers/Notch";
import Rail from "./Helpers/Rail";
import RailSelected from "./Helpers/RailSelected";
import Slider from "rn-range-slider";
import Thumb from "./Helpers/Thumb";
import getStyles from "./RangeSlider.styles";

const RangeSlider = ({ isDisabled, label, max, min, onChange, step }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  return (
    <>
      <Slider
        min={min}
        max={max}
        step={step}
        disabled={isDisabled}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={onChange}
      />
      <View style={styles.slider}>
        <View style={{ ...styles.sliderValue, ...styles.sliderLeftValue }}>
          <CommonText customTextStyle={styles.sliderValueText}>
            {`${min} ${label || ""}`}
          </CommonText>
        </View>
        <View style={{ ...styles.sliderValue, ...styles.sliderRightValue }}>
          <CommonText customTextStyle={styles.sliderValueText}>
            {`${max} ${label || ""}`}
          </CommonText>
        </View>
      </View>
    </>
  );
};

RangeSlider.defaultProps = {
  isDisabled: false,
  label: "",
  max: 0,
  min: 0,
  onChange: () => {},
  step: 1,
};

RangeSlider.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number,
};

export default RangeSlider;
