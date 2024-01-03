import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./IconHeader.style";

const IconHeader = ({
  ActionComponent,
  headerText,
  iconLeft,
  iconRight,
  onPressLeftIcon,
  onPressRightIcon,
}) => {
  const { isWebView } = useIsWebView();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainerStyle}>
        <View style={styles.iconContainer}>
          {iconLeft && (
            <CustomTouchableOpacity onPress={onPressLeftIcon}>
              <Image source={iconLeft} />
            </CustomTouchableOpacity>
          )}
          {iconRight && (
            <CustomTouchableOpacity onPress={onPressRightIcon}>
              <Image source={iconRight} />
            </CustomTouchableOpacity>
          )}
        </View>
        <View style={styles.titleContainer}>
          <CommonText
            title={headerText}
            customTextStyle={
              isWebView ? styles.webHeaderStyle : styles.formHeaderStyle
            }
          />
          {ActionComponent ? ActionComponent : null}
        </View>
      </View>
      <View style={styles.borderStyle} />
    </View>
  );
};

IconHeader.defaultProps = {
  ActionComponent: null,
  headerText: "",
  iconLeft: null,
  iconRight: null,
  onPressLeftIcon: () => {},
  onPressRightIcon: () => {},
};

IconHeader.propTypes = {
  ActionComponent: PropTypes.element,
  headerText: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  onPressLeftIcon: PropTypes.func,
  onPressRightIcon: PropTypes.func,
};

export default IconHeader;
