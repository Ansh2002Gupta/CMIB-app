import React from "react";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import styles from "./CustomCell.style";
import CustomTouchableOpacity from "../CustomTouchableOpacity/CustomTouchableOpacity";
import CustomImage from "../CustomImage/CustomImage";

const CustomColumn = ({
  onPress,
  title,
  style,
  textStyle,
  disabled = false,
  isLeft=false,
  leftSource,
  isRight=false,
  rightSource,
  isSvg=false,
}) => {

  return (
    <CustomTouchableOpacity
      onPress={onPress}
      style={{...styles.buttonContainer, ...style} }
      disabled={disabled}
    >
      {isLeft && (
        <CustomImage Icon={leftSource} source={leftSource} isSvg={isSvg} />
      )}

      <CommonText customTextStyle={textStyle} title={title} />
      {isRight && (
        <CustomImage Icon={rightSource} source={rightSource} isSvg={isSvg} />
      )}
    </CustomTouchableOpacity>
  );
};
CustomColumn.defaultProps = {
  style: {},
  textStyle: {},
  disabled: false,
  iconLeft: null,
  iconRight: null,
};
CustomColumn.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
export default CustomColumn;
