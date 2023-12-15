import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./IconHeader.style";

const IconHeader = ({headerText, iconLeft, iconRight, onPressLeftIcon, onPressRightIcon }) => {
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
        <CommonText
        title={headerText}
        customTextStyle={styles.formHeaderStyle}
        />
      </View>
      <View style={styles.borderStyle} />
    </View>
  );
};

IconHeader.propTypes = {
  headerText: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  onPressLeftIcon: PropTypes.func,
  onPressRightIcon: PropTypes.func,
};

export default IconHeader;
