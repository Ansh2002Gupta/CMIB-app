import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import getStyles from "./CustomCell.style";

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
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <CustomTouchableOpacity
      onPress={onPress}
      style={{ ...styles.buttonContainer, ...style }}
      disabled={disabled}
    >
      {!!leftSource && (
        <CustomImage Icon={leftSource} source={leftSource} isSvg={isSvg} />
      )}
      <CommonText
        customTextStyle={textStyle}
        fontWeight={textStyle?.fontWeight || "600"}
      >
        {title}
      </CommonText>
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
  style: PropTypes.object,
  textStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default CustomCell;
