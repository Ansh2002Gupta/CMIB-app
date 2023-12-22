import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./CustomView.style";

const CustomView = ({
  children,
  style,
  customLabelStyle,
  label,
  isMandatory,
  ...props
}) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

  return (
    <View style={[styles.parentContainer, style]}>
      <View style={styles.labelContainer}>
        <CommonText
          customTextStyle={[
            styles.label,
            isWebView && styles.webLabel,
            customLabelStyle,
          ]}
          title={label}
        />
        {isMandatory && (
          <CommonText
            customTextStyle={[styles.labelStar, styles.starStyle]}
            title={"*"}
          />
        )}
      </View>

      {children}
    </View>
  );
};

CustomView.defaultProps = {
  children: null,
  style: {},
  customLabelStyle: {},
  label: "",
  isMandatory: false,
};

CustomView.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customLabelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  isMandatory: PropTypes.bool,
};

export default CustomView;
