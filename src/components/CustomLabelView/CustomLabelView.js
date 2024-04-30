import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import getStyles from "./CustomLabelView.style";

const CustomLabelView = ({
  children,
  customLabelStyle,
  isMandatory,
  label,
  style,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.parentContainer, style]}>
      <View style={styles.labelContainer}>
        <CommonText
          customTextStyle={[styles.label, customLabelStyle]}
          fontWeight={customLabelStyle?.fontWeight}
        >
          {label}
        </CommonText>
        {isMandatory && (
          <CommonText customTextStyle={[styles.labelStar, styles.starStyle]}>
            {"*"}
          </CommonText>
        )}
      </View>
      {children}
    </View>
  );
};

CustomLabelView.defaultProps = {
  children: null,
  customLabelStyle: {},
  isMandatory: false,
  label: "",
  style: {},
};

CustomLabelView.propTypes = {
  children: PropTypes.node,
  customLabelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CustomLabelView;
