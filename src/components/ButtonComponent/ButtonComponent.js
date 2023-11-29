import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import styles from "./ButtonComponent.style";
import images from "../../images";

const ButtonComponent = (props) => {
  const { title, onPress, disabled, customTitleStyle, customButtonContainer, hasIconRight } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, disabled && styles.disableButtonStyle, customButtonContainer]}
      disabled={disabled}
    >
      <Text style={[styles.titleStyle, customTitleStyle]}>{title}</Text>
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
  hasIconRight: PropTypes.bool
};

export default ButtonComponent;
