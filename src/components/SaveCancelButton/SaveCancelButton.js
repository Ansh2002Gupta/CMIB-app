import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  View,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import images from "../../images";
import styles from "./SaveCancelButton.style";

const SaveCancelButton = (props) => {
  const {
    buttonOneText,
    buttonTwoText,
    onPressButtonOne,
    onPressButtonTwo,
    hasIconRight,
    hasIconLeft,
    isNextDisabled,
    customContainerStyle,
  } = props;

  return (
    <View style={[styles.containerStyle, customContainerStyle]}>
      <TouchableOpacity
        onPress={onPressButtonOne}
        style={styles.disableButtonStyle}
      >
        {hasIconLeft && <Image source={images.iconArrowLeft} />}

        <CommonText
          customTextStyle={styles.disableTextStyle}
          title={buttonOneText}
        />
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
        <CommonText customTextStyle={styles.titleStyle} title={buttonTwoText} />
        {hasIconRight && <Image source={images.iconArrowRightWhite} />}
      </TouchableOpacity>
    </View>
  );
};

SaveCancelButton.propTypes = {
  buttonOneText: PropTypes.string.isRequired,
  buttonTwoText: PropTypes.string.isRequired,
  customContainerStyle: PropTypes.object.isRequired,
  hasIconRight: PropTypes.bool,
  hasIconLeft: PropTypes.bool,
  isNextDisabled: PropTypes.bool,
  onPressButtonOne: PropTypes.func,
  onPressButtonTwo: PropTypes.func,
};

export default SaveCancelButton;
