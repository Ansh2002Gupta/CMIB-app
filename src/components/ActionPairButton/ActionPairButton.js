import React from "react";
import PropTypes from "prop-types";

import CustomButton from "../CustomButton/CustomButton";
import { TwoColumn } from "../../core/layouts";
import styles from "./ActionPairButton.style";

const ActionPairButton = ({
  buttonOneText,
  buttonTwoText,
  buttonsType,
  customStyles,
  displayLoader,
  iconRight,
  iconLeft,
  isButtonOneGreen,
  isButtonTwoGreen,
  isDisabled,
  onPressButtonOne,
  onPressButtonTwo,
}) => {
  const { buttonOneStyle, buttonTwoStyle, customContainerStyle } = customStyles;
  const { buttonOneType, buttonTwoType } = buttonsType || {};

  return (
    <TwoColumn
      style={{ ...styles.containerStyle, ...customContainerStyle }}
      leftSection={
        <CustomButton
          iconLeft={iconLeft}
          onPress={onPressButtonOne}
          style={{ ...styles.buttonStyle, ...buttonOneStyle }}
          type={buttonOneType}
          withGreenBackground={isButtonOneGreen}
        >
          {buttonOneText}
        </CustomButton>
      }
      rightSection={
        <CustomButton
          disabled={isDisabled}
          iconRight={iconRight}
          isLoading={displayLoader}
          onPress={onPressButtonTwo}
          style={buttonTwoStyle}
          type={buttonTwoType}
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
  buttonsType: {
    buttonOneType: "button",
    buttonTwoType: "submit",
  },
  customStyles: {
    buttonOneStyle: {},
    buttonTwoStyle: {},
    customContainerStyle: {},
  },
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
  buttonsType: PropTypes.object,
  customStyles: PropTypes.object,
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
