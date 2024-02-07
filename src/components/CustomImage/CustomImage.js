import React from "react";
import PropTypes from "prop-types";
import { Image, Platform } from "@unthinkable/react-core-components";

import styles from "./customImage.style";

const CustomImage = ({
  alt,
  height,
  Icon,
  isSvg,
  resizeMode,
  source,
  style,
  width,
}) => {
  const getDimensions = () => {
    if (height && width) {
      return { height, width };
    }
    if (height) {
      return { height };
    }
    if (width) {
      return { width };
    }
    return {};
  };

  const renderImage = () => {
    return (
      <Image
        source={source}
        style={style}
        resizeMode={resizeMode}
        alt={alt}
        {...getDimensions()}
      />
    );
  };

  if (Platform.OS.toLowerCase() === "web") {
    return renderImage();
  }
  if (isSvg) {
    return <Icon {...getDimensions()} style={style} />;
  }
  return renderImage();
};

CustomImage.defaultProps = {
  alt: "",
  isSvg: false,
  resizeMode: "contain",
  style: styles.logo,
};

CustomImage.propTypes = {
  alt: PropTypes.string,
  height: PropTypes.number,
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
    PropTypes.any,
  ]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  width: PropTypes.number,
};

export default CustomImage;
