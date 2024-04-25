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
  disableLeftStyle,
  displayLoader,
  displayLoaderLeft,
  customLoadingStyleButtonOne,
  buttonOneLoaderColor,
  buttonTwoLoaderColor,
  disableRightStyle,
  iconRight,
  iconLeft,
  isButtonOneGreen,
  isButtonTwoGreen,
  isDisabled,
  isDisabledLeft,
  isButtonOneDisabled,
  isDisabled: isButtonTwoDisabled,
  onPressButtonOne,
  onPressButtonTwo,
}) => {
  const {
    buttonOneStyle,
    buttonOneContainerStyle,
    buttonOneTextStyle,
    buttonTwoStyle,
    buttonTwoContainerStyle,
    buttonTwoTextStyle,
    customContainerStyle,
  } = customStyles;
  const { buttonOneType, buttonTwoType } = buttonsType || {};

  return (
    <TwoColumn
      style={{ ...styles.containerStyle, ...customContainerStyle }}
      leftSection={
        !!buttonOneText && (
          <CustomButton
            disabledStyle={disableLeftStyle}
            disabled={isButtonOneDisabled || isDisabledLeft}
            isLoading={displayLoaderLeft}
            customLoadingStyle={customLoadingStyleButtonOne}
            color={buttonOneLoaderColor}
            iconLeft={iconLeft}
            onPress={onPressButtonOne}
            customStyle={{ customTextStyle: buttonOneTextStyle }}
            style={{ ...styles.buttonStyle, ...buttonOneStyle }}
            type={buttonOneType}
            withGreenBackground={isButtonOneGreen}
          >
            {buttonOneText}
          </CustomButton>
        )
      }
      // temporarly comented apply button as this functionality may come in near future
      rightSection={
        !!buttonTwoText && (
          <CustomButton
            disabledStyle={disableRightStyle}
            disabled={isDisabled || isButtonTwoDisabled}
            customStyle={{ customTextStyle: buttonTwoTextStyle }}
            iconRight={iconRight}
            isLoading={displayLoader}
            color={buttonTwoLoaderColor}
            onPress={onPressButtonTwo}
            style={buttonTwoStyle}
            type={buttonTwoType}
            withGreenBackground={isButtonTwoGreen}
          >
            {buttonTwoText}
          </CustomButton>
        )
      }
      leftSectionStyle={{ ...styles.buttonStyle, ...buttonOneContainerStyle }}
      rightSectionStyle={{
        ...styles.secondButtonStyle,
        ...styles.buttonStyle,
        ...buttonTwoContainerStyle,
      }}
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
    buttonOneContainerStyle: {},
    buttonOneTextStyle: {},
    buttonTwoStyle: {},
    buttonTwoContainerStyle: {},
    buttonTwoTextStyle: {},
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
  buttonOneLoaderColor: PropTypes.string,
  buttonTwoLoaderColor: PropTypes.string,
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
  isDisabled: PropTypes.bool,
  isButtonOneGreen: PropTypes.bool,
  isButtonTwoGreen: PropTypes.bool,
  onPressButtonOne: PropTypes.func,
  onPressButtonTwo: PropTypes.func,
};

export default ActionPairButton;
