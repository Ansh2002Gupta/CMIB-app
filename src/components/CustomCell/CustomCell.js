import React from "react";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity/";
import CustomImage from "../CustomImage";
import styles from "./CustomCell.style";

const CustomCell = ({
  disabled = false,
  isLeft = false,
  isRight = false,
  isSvg = false,
  leftSource,
  onPress,
  rightSource,
  style,
  textStyle,
  title,
}) => {
  return (
    <CustomTouchableOpacity
      onPress={onPress}
      style={{ ...styles.buttonContainer, ...style }}
      disabled={disabled}
    >
      {!!isLeft && (
        <CustomImage Icon={leftSource} source={leftSource} isSvg={isSvg} />
      )}
      <CommonText customTextStyle={textStyle} title={title} />
      {!!isRight && (
        <CustomImage Icon={rightSource} source={rightSource} isSvg={isSvg} />
      )}
    </CustomTouchableOpacity>
  );
};

CustomCell.defaultProps = {
  disabled: false,
  iconLeft: null,
  iconRight: null,
  style: {},
  textStyle: {},
};

CustomCell.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default CustomCell;
