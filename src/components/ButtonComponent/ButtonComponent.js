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
  const { title, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Image source={images.iconArrowRightWhite} />
    </TouchableOpacity>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ButtonComponent;
