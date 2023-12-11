import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import styles from "./IconHeader.style";

const IconHeader = (props) => {
  const { headerText, iconLeft, iconRight, onPressLeftIcon, onPressRightIcon } = props;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainerStyle}>
        <View style={styles.iconContainer}>
          {iconLeft && (
            <TouchableOpacity onPress={onPressLeftIcon}>
              <Image source={iconLeft} />
            </TouchableOpacity>
          )}
          {iconRight && 
          <TouchableOpacity onPress={onPressRightIcon}>
          <Image source={iconRight} />
          </TouchableOpacity>
          }
        </View>
        <Text style={styles.formHeaderStyle}>{headerText}</Text>
      </View>
      <View style={styles.borderStyle} />
    </View>
  );
};

IconHeader.propTypes = {
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  headerText: PropTypes.string,
  onPressLeftIcon: PropTypes.func,
  onPressRightIcon: PropTypes.func,
};

export default IconHeader;
