import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./CustomLabelView.style";

const CustomLabelView = ({
  children,
  style,
  customLabelStyle,
  label,
  isMandatory,
  ...props
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

CustomLabelView.defaultProps = {
  children: null,
  style: {},
  customLabelStyle: {},
  label: "",
  isMandatory: false,
};

CustomLabelView.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customLabelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  isMandatory: PropTypes.bool,
};

export default CustomLabelView;
