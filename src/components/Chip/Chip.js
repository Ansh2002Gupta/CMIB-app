import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import getStyles from "./Chip.style";

const Chip = ({
  bgColor,
  label,
  style,
  textColor,
  customContainerStyle,
  isBackground,
}) => {
  const theme = useTheme();
  const { styles } = getStyles(theme);
  const { isWebView } = useIsWebView();

  return (
    <CommonText
      customContainerStyle={customContainerStyle}
      customTextStyle={{
        ...(isWebView || isBackground
          ? styles.chipStyleWeb(
              textColor || theme.colors.orange,
              bgColor || theme.colors.lightOrange
            )
          : styles.chipStyle(textColor || theme.colors.orange)),
        ...style,
      }}
    >
      {label}
    </CommonText>
  );
};

Chip.defaultProps = {
  style: {},
  customContainerStyle: {},
  isBackground: false,
};

Chip.propTypes = {
  bgColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  textColor: PropTypes.string,
  customContainerStyle: PropTypes.object,
  isBackground: PropTypes.bool,
};

export default Chip;
