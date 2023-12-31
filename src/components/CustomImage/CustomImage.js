import React from "react";
import PropTypes from "prop-types";
import { Image, Platform } from "@unthinkable/react-core-components";

import styles from "./customImage.style";

const CustomImage = ({ alt, Icon, isSvg, resizeMode, source, style }) => {
  if (Platform.OS.toLowerCase() === "web") {
    return (
      <Image source={source} style={style} resizeMode={resizeMode} alt={alt} />
    );
  }
  if (isSvg) {
    return <Icon style={style} />;
  }
  return (
    <Image source={source} style={style} resizeMode={resizeMode} alt={alt} />
  );
};

CustomImage.defaultProps = {
  alt: "",
  isSvg: false,
  resizeMode: "contain",
  style: styles.logo,
};

CustomImage.propTypes = {
  alt: PropTypes.string,
  isSvg: PropTypes.bool,
  resizeMode: PropTypes.oneOf([
    "center",
    "cover",
    "contain",
    "stretch",
    "repeat",
  ]),
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CustomImage;
