import React from "react";
import PropTypes from "prop-types";

import CustomButton from "../CustomButton/CustomButton";
import { TwoColumn } from "../../core/layouts";
import styles from "./ActionPairButton.style";

const ActionPairButton = ({
  buttonOneText,
  buttonTwoText,
  customContainerStyle,
  displayLoader,
  iconRight,
  iconLeft,
  isButtonOneGreen,
  isButtonTwoGreen,
  isDisabled,
  onPressButtonOne,
  onPressButtonTwo,
}) => {
  return (
    <TwoColumn
      style={{ ...styles.containerStyle, ...customContainerStyle }}
      leftSection={
        <CustomButton
          onPress={onPressButtonOne}
          style={styles.buttonStyle}
          iconLeft={iconLeft}
          withGreenBackground={isButtonOneGreen}
        >
          {buttonOneText}
        </CustomButton>
      }
      rightSection={
        <CustomButton
          isLoading={displayLoader}
          disabled={isDisabled}
          onPress={onPressButtonTwo}
          iconRight={iconRight}
          withGreenBackground={isButtonTwoGreen}
        >
          {buttonTwoText}
        </CustomButton>
      }
      leftSectionStyle={styles.buttonStyle}
      rightSectionStyle={{ ...styles.secondButtonStyle, ...styles.buttonStyle }}
    />
  );
};

ActionPairButton.defaultProps = {
  customContainerStyle: {},
  displayLoader: false,
  iconLeft: {
    isLeftIconNotSvg: false,
    leftIconAlt: "",
    leftIconSource: "",
  },
  iconRight: {
    isRightIconNotSvg: false,
    rightIconAlt: "",
    rightIconSource: "",
  },
  isDisabled: false,
  isButtonOneGreen: false,
  isButtonTwoGreen: false,
  onPressButtonOne: () => {},
  onPressButtonTwo: () => {},
};

ActionPairButton.propTypes = {
  buttonOneText: PropTypes.string.isRequired,
  buttonTwoText: PropTypes.string.isRequired,
  customContainerStyle: PropTypes.object,
  displayLoader: PropTypes.bool,
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
  isDisabled: PropTypes.bool,
  isButtonOneGreen: PropTypes.bool,
  isButtonTwoGreen: PropTypes.bool,
  onPressButtonOne: PropTypes.func,
  onPressButtonTwo: PropTypes.func,
};

export default ActionPairButton;
