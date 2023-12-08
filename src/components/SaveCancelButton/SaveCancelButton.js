import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import styles from "./SaveCancelButton.style";
import images from "../../images";

const SaveCancelButton = (props) => {
  const {
    disableButtonText,
    activeButtonText,
    onPressDisable,
    onPressActive,
    hasIconRight,
    isNextDisabled,
  } = props;

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={onPressDisable}
        style={styles.disableButtonStyle}
      >
        <Image source={images.iconArrowLeft} />

        <Text style={styles.disableTextStyle}>{disableButtonText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressActive}
        style={[
          styles.buttonStyle,
          styles.secondButotnStyle,
          isNextDisabled && styles.disableStyle,
        ]}
        disabled={isNextDisabled}
      >
        <Text style={styles.titleStyle}>{activeButtonText}</Text>
        {hasIconRight && <Image source={images.iconArrowRightWhite} />}
      </TouchableOpacity>
    </View>
  );
};

SaveCancelButton.propTypes = {
  disableButtonText: PropTypes.string.isRequired,
  activeButtonText: PropTypes.string.isRequired,
  onPressDisable: PropTypes.func,
  onPressActive: PropTypes.func,
  hasIconRight: PropTypes.bool,
  isNextDisabled: PropTypes.bool,
};

export default SaveCancelButton;
