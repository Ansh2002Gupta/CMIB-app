import React from "react";
import PropTypes from "prop-types";
import { Image, Platform } from "@unthinkable/react-core-components";

import styles from "./customImage.style";

const CustomImage = ({ Icon, isSvg, resizeMode, source, style }) => {
  if (Platform.OS.toLowerCase() === "web") {
    return <Image source={source} style={style} resizeMode={resizeMode} />;
  }
  if (isSvg) {
    return <Icon style={style} />;
  }
  return <Image source={source} style={style} resizeMode={resizeMode} />;
};

CustomImage.defaultProps = {
  isSvg: false,
  resizeMode: "contain",
  style: styles.logo,
};

CustomImage.propTypes = {
  isSvg: PropTypes.bool,
  resizeMode: PropTypes.oneOf([
    "center",
    "cover",
    "contain",
    "stretch",
    "repeat",
  ]),
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  
};

export default CustomImage;
