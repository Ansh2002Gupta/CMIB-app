import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./CustomLabelView.style";

const CustomLabelView = ({
  children,
  customLabelStyle,
  isMandatory,
  label,
  style,
}) => {
  const { isWebView } = useIsWebView();
  return (
    <View style={[styles.parentContainer, style]}>
      <View style={styles.labelContainer}>
        <CommonText
          customTextStyle={[
            styles.label,
            isWebView && styles.webLabel,
            customLabelStyle,
          ]}
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
