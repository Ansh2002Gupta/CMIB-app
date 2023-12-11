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
    buttonOneText,
    buttonTwoText,
    onPressButtonOne,
    onPressButtonTwo,
    hasIconRight,
    isNextDisabled,
  } = props;

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        onPress={onPressButtonOne}
        style={styles.disableButtonStyle}
      >
        <Image source={images.iconArrowLeft} />

        <Text style={styles.disableTextStyle}>{buttonOneText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressButtonTwo}
        style={[
          styles.buttonStyle,
          styles.secondButotnStyle,
          isNextDisabled && styles.disableStyle,
        ]}
        disabled={isNextDisabled}
      >
        <Text style={styles.titleStyle}>{buttonTwoText}</Text>
        {hasIconRight && <Image source={images.iconArrowRightWhite} />}
      </TouchableOpacity>
    </View>
  );
};

SaveCancelButton.propTypes = {
  buttonOneText: PropTypes.string.isRequired,
  buttonTwoText: PropTypes.string.isRequired,
  hasIconRight: PropTypes.bool,
  isNextDisabled: PropTypes.bool,
  onPressButtonOne: PropTypes.func,
  onPressButtonTwo: PropTypes.func,
};

export default SaveCancelButton;
