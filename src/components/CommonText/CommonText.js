import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { Text, View } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";
import getStyles from "./CommonText.style";

const CommonText = ({
  children,
  containerRef,
  customContainerStyle,
  customTextProps,
  customTextStyle,
  fontWeight,
  isunderLine,
  underLinecolor,
  underLineStyle,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const styleArray = Array.isArray(customTextStyle)
    ? customTextStyle
    : [customTextStyle];

  const textStyles = [styles.textStyle(fontWeight), ...styleArray];

  return (
    <View
      style={{
        ...styles.container,
        ...customContainerStyle,
      }}
      ref={containerRef}
    >
      <Text {...customTextProps} style={textStyles}>
        {children}
      </Text>
      {isunderLine && (
        <View
          style={{
            ...styles.horizontalLine(underLinecolor),
            ...underLineStyle,
          }}
        />
      )}
    </View>
  );
};

CommonText.defaultProps = {
  children: <></>,
  customContainerStyle: {},
  customTextProps: {},
  customTextStyle: {},
  fontWeight: "500",
  isunderLine: false,
  underLinecolor: colors.black,
  underLineStyle: {},
};

CommonText.propTypes = {
  children: PropTypes.node,
  customContainerStyle: PropTypes.object,
  customTextProps: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fontWeight: PropTypes.string,
  isunderLine: PropTypes.bool,
  underLinecolor: PropTypes.string,
  underLineStyle: PropTypes.object,
};

export default CommonText;
