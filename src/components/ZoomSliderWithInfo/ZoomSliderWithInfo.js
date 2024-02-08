import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import Slider from "../Slider";
import images from "../../images";
import { ZOOM_CONSTANT } from "../../constants/constants";
import styles from "./ZoomSliderWithInfo.style";

const ZoomSliderWithInfo = ({ setZoom, setRotation, zoom }) => {
  const zoomPercentage = Math.floor(
    ((zoom - ZOOM_CONSTANT.MIN_ZOOM) /
      (ZOOM_CONSTANT.MAX_ZOOM - ZOOM_CONSTANT.MIN_ZOOM)) *
      100
  );

  const zoomOutHandler = () => {
    if (zoom === ZOOM_CONSTANT.MIN_ZOOM) {
      return;
    }
    const decrement = +(zoom - ZOOM_CONSTANT.ZOOM_STEP).toFixed(1);
    setZoom(decrement);
  };

  const zoomInHandler = () => {
    if (zoom >= ZOOM_CONSTANT.MAX_ZOOM) {
      return;
    }
    const increment = +(zoom + ZOOM_CONSTANT.ZOOM_STEP).toFixed(1);
    setZoom(increment);
  };

  return (
    <View style={styles.zoomInfoContainer}>
      <View style={styles.sliderBox}>
        <Image
          source={images.minusCirlce}
          alt="Zoom out"
          width={20}
          height={20}
          style={styles.zoomIcon}
          onClick={zoomOutHandler}
        />
        <View style={styles.zoomSlider}>
          <Slider
            maximumValue={ZOOM_CONSTANT.MAX_ZOOM}
            minimumValue={ZOOM_CONSTANT.MIN_ZOOM}
            onChange={setZoom}
            step={ZOOM_CONSTANT.ZOOM_STEP}
            value={+zoom}
          />
        </View>
        <Image
          source={images.addCircle}
          alt="Zoom in"
          width={20}
          height={20}
          style={styles.zoomIcon}
          onClick={zoomInHandler}
        />
      </View>
      <CommonText
        customTextStyle={styles.percentageText}
      >{`${zoomPercentage}%`}</CommonText>
      <Image
        source={images.iconRotate}
        alt="Rotate"
        width={20}
        height={20}
        style={styles.zoomIcon}
        onClick={() => {
          setRotation((prev) => (prev + 90) % 360);
        }}
      />
    </View>
  );
};

ZoomSliderWithInfo.defaultProps = {
  setRotation: () => {},
  setZoom: () => {},
  zoom: 1,
};

ZoomSliderWithInfo.propTypes = {
  setRotation: PropTypes.func,
  setZoom: PropTypes.func,
  zoom: PropTypes.number,
};

export default ZoomSliderWithInfo;
