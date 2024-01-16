import React from "react";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import colors from "../../assets/colors";
import styles from "./Chip.style";

const Chip = ({ bgColor, label, style, textColor }) => {
  const { isWebView } = useIsWebView();

  return (
    <CommonText
      customTextStyle={{
        ...(isWebView
          ? styles.chipStyleWeb(textColor, bgColor)
          : styles.chipStyle(textColor)),
        ...style,
      }}
    >
      {label}
    </CommonText>
  );
};

Chip.defaultProps = {
    bgColor: colors.lightOrange,
    style: {},
    textColor: colors.orange,
  };

Chip.propTypes = {
    bgColor: PropTypes.string,
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    textColor: PropTypes.string,
  };
  
export default Chip;
