import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./Header.style";

const Header = (props) => {
  const {
    customHeaderTextStyle,
    headerText,
    iconLeft,
    iconRight,
    onPressLeftIcon,
  } = props;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";
  return (
    <View style={styles.container}>
      <View style={styles.headerContainerStyle}>
        <View style={styles.iconContainer}>
          {iconLeft && !isWebView && (
            <TouchableOpacity onPress={onPressLeftIcon}>
              <Image source={iconLeft} />
            </TouchableOpacity>
          )}
          {iconRight && !isWebView && <Image source={iconRight} />}
        </View>
        <CommonText
          title={headerText}
          customTextStyle={{
            ...styles.formHeaderStyle,
            ...customHeaderTextStyle,
          }}
        />
      </View>
      <View style={styles.borderStyle} />
    </View>
  );
};

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  onPressLeftIcon: PropTypes.func,
};

export default Header;