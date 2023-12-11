import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import styles from "./Header.style";

const Header = (props) => {
  const {
    headerText,
    children,
    iconLeft,
    iconRight,
    onPressLeftIcon,
    customHeaderTextStyle,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainerStyle}>
        <View style={styles.iconContainer}>
          {iconLeft && (
            <TouchableOpacity onPress={onPressLeftIcon}>
              <Image source={iconLeft} />
            </TouchableOpacity>
          )}
          {iconRight && <Image source={iconRight} />}
        </View>
        <Text style={[styles.formHeaderStyle, customHeaderTextStyle]}>
          {headerText}
        </Text>
      </View>
      <View style={styles.borderStyle} />
      <View style={styles.innerContainer}>{children}</View>
    </View>
  );
};

Header.propTypes = {
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  headerText: PropTypes.string,
  onPressLeftIcon: PropTypes.func,
  children: PropTypes.object.isRequired,
};

export default Header;
