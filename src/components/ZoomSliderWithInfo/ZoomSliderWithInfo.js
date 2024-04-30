import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import Slider from "../Slider";
import images from "../../images";
import { ZOOM_CONSTANT } from "../../constants/constants";
import getStyles from "./ZoomSliderWithInfo.style";

const ZoomSliderWithInfo = ({ setZoom, setRotation, zoom }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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
          source={
            zoomPercentage === 0 ? images.iconDisabledMinus : images.minusCirlce
          }
          alt="Zoom out"
          width={20}
          height={20}
          style={zoomPercentage === 0 ? styles.disabledIcon : styles.zoomIcon}
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
          source={
            zoomPercentage === 100 ? images.iconDisabledAdd : images.addCircle
          }
          alt="Zoom in"
          width={20}
          height={20}
          style={zoomPercentage === 100 ? styles.disabledIcon : styles.zoomIcon}
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
          setRotation((prevRotation) => (prevRotation - 90) % 360);
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
