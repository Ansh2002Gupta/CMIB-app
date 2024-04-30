import React, { useCallback, useEffect, useRef } from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import classes from "./RangeSlider.module.css";
import getStyles from "./RangeSlider.styles";

const RangeSlider = ({
  isDisabled,
  label,
  max,
  min,
  onChange,
  range,
  setRange,
  step,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const rangeRef = useRef(null);
  const minLabelValRef = useRef(null);
  const maxLabelValRef = useRef(null);

  const maxVal = range?.max || 0;
  const minVal = range?.min || 0;

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        if (minLabelValRef.current) {
          minLabelValRef.current.style.left = `${minPercent}%`;
          minLabelValRef.current.style.transform = `translate(-${minPercent}%, -25px)`;
        }
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
      if (maxLabelValRef.current) {
        maxLabelValRef.current.style.left = `${maxPercent}%`;
        maxLabelValRef.current.style.transform = `translate(-${maxPercent}%, -25px)`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  return (
    <View>
      <View style={styles.thumbAndLabelBox}>
        {minVal !== min && (
          <CommonText
            containerRef={minLabelValRef}
            customContainerStyle={styles.thumbValue}
          >
            {minVal}
          </CommonText>
        )}
        <input
          type="range"
          style={{ ...styles.thumb, ...styles.elevatedThumbSm }}
          className={`${isDisabled ? classes.disabledRange : ""} ${
            classes.thumb
          }`}
          disabled={isDisabled}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - step);
            setRange((prev) => {
              return { ...prev, ...{ min: value } };
            });
            event.target.value = value.toString();
          }}
          {...{ min, max, step }}
        />
      </View>
      <View style={styles.thumbAndLabelBox}>
        {maxVal !== max && (
          <CommonText
            containerRef={maxLabelValRef}
            customContainerStyle={styles.thumbValue}
          >
            {maxVal}
          </CommonText>
        )}
        <input
          type="range"
          style={{ ...styles.thumb, ...styles.elevatedThumbMd }}
          className={`${isDisabled ? classes.disabledRange : ""} ${
            classes.thumb
          }`}
          value={maxVal}
          ref={maxValRef}
          disabled={isDisabled}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + step);
            setRange((prev) => {
              return { ...prev, ...{ max: value } };
            });
            event.target.value = value.toString();
          }}
          {...{ min, max, step }}
        />
      </View>
      <View style={styles.slider}>
        <View style={{ ...styles.sliderCommon, ...styles.sliderTrack }} />
        <View
          ref={rangeRef}
          style={{ ...styles.sliderCommon, ...styles.sliderRange }}
        />
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
    </View>
  );
};

RangeSlider.defaultProps = {
  isDisabled: false,
  label: "",
  max: 0,
  min: 0,
  onChange: () => {},
  setRange: () => {},
  step: 1,
};

RangeSlider.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  range: PropTypes.shape({
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
  setRange: PropTypes.func,
  step: PropTypes.number,
};

export default RangeSlider;
