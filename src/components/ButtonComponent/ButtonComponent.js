import React from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import colors from "../../assets/colors";
import images from "../../images";
import styles from "./ButtonComponent.style";

const ButtonComponent = (props) => {
  const { title, onPress, disabled, customTitleStyle, customButtonContainer, hasIconRight, displayLoader } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, disabled && styles.disableButtonStyle, customButtonContainer]}
      disabled={disabled}
    >
      {displayLoader ? 
      <ActivityIndicator color={colors.white} />
      :
        <Text style={[styles.titleStyle, customTitleStyle]}>{title}</Text>
        }
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
  displayLoader: PropTypes.bool
};

export default ButtonComponent;
