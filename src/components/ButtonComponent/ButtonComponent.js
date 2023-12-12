import React from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import colors from "../../assets/colors";
import CommonText from "../CommonText";
import images from "../../images";
import styles from "./ButtonComponent.style";

const ButtonComponent = (props) => {
  const {
    title,
    onPress,
    disabled,
    customTitleStyle,
    customButtonContainer,
    hasIconRight,
    displayLoader,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonStyle,
        disabled && styles.disableButtonStyle,
        customButtonContainer,
      ]}
      disabled={disabled}
    >
      {displayLoader ? (
        <ActivityIndicator color={colors.white} />
      ) : (
      
        <CommonText customTextStyle={[styles.titleStyle, customTitleStyle]} title={title} />
      )}
      {hasIconRight && <Image source={images.iconArrowRightWhite} />}
    </TouchableOpacity>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  customButtonContainer: PropTypes.object,
  customTitleStyle: PropTypes.object,
  hasIconRight: PropTypes.bool,
  displayLoader: PropTypes.bool,
};

export default ButtonComponent;
