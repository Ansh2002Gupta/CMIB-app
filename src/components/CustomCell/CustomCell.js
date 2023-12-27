import React from "react";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CustomImage from "../CustomImage";
import styles from "./CustomCell.style";

const CustomCell = ({
  disabled,
  isSvg,
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
      {!!leftSource && (
        <CustomImage Icon={leftSource} source={leftSource} isSvg={isSvg} />
      )}
      <CommonText customTextStyle={textStyle} title={title} />
      {!!rightSource && (
        <CustomImage Icon={rightSource} source={rightSource} isSvg={isSvg} />
      )}
    </CustomTouchableOpacity>
  );
};

CustomCell.defaultProps = {
  disabled: false,
  isSvg: false,
  style: {},
  textStyle: {},
  onPress: () => {},
};

CustomCell.propTypes = {
  disabled: PropTypes.bool,
  isSvg: PropTypes.bool,
  leftSource: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  onPress: PropTypes.func.isRequired,
  rightSource: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  title: PropTypes.string.isRequired,
};

export default CustomCell;
