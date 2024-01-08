import React from "react";
import PropTypes from "prop-types";
import { Platform, View } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import Spinner from "../Spinner";
import images from "../../images";
import colors from "../../assets/colors";
import styles from "./SaveCancelButton.style";

const SaveCancelButton = ({
  buttonOneText,
  buttonTwoText,
  customContainerStyle,
  displayLoader,
  hasIconRight,
  hasIconLeft,
  isNextDisabled,
  onPressButtonOne,
  onPressButtonTwo,
}) => {
  const webProps = Platform.OS.toLowerCase() === "web" ? { size: "xs" } : {};

  return (
    <View style={[styles.containerStyle, customContainerStyle]}>
      <CustomTouchableOpacity
        onPress={onPressButtonOne}
        style={styles.disableButtonStyle}
      >
        {!!hasIconLeft && (
          <CustomImage
            alt={"left-arrow"}
            Icon={images.iconArrowLeft}
            isSvg
            source={images.iconArrowLeft}
          />
        )}
        <CommonText customTextStyle={styles.disableTextStyle}>
          {buttonOneText}
        </CommonText>
      </CustomTouchableOpacity>
      <CustomTouchableOpacity
        onPress={onPressButtonTwo}
        style={[
          styles.buttonStyle,
          styles.secondButtonStyle,
          isNextDisabled && styles.disableStyle,
        ]}
        disabled={isNextDisabled || displayLoader}
      >
        {displayLoader ? (
          <Spinner thickness={3} color={colors.white} {...webProps} />
        ) : (
          <>
            <CommonText customTextStyle={styles.titleStyle}>
              {buttonTwoText}
            </CommonText>
            {!!hasIconRight && (
              <CustomImage
                alt={"right-arrow"}
                Icon={images.iconArrowRightWhite}
                source={images.iconArrowRightWhite}
                isSvg
              />
            )}
          </>
        )}
      </CustomTouchableOpacity>
    </View>
  );
};

SaveCancelButton.defaultProps = {
  customContainerStyle: {},
  displayLoader: false,
  hasIconRight: false,
  hasIconLeft: false,
  isNextDisabled: false,
  onPressButtonOne: () => {},
  onPressButtonTwo: () => {},
};

SaveCancelButton.propTypes = {
  buttonOneText: PropTypes.string.isRequired,
  buttonTwoText: PropTypes.string.isRequired,
  customContainerStyle: PropTypes.object,
  displayLoader: PropTypes.bool,
  hasIconRight: PropTypes.bool,
  hasIconLeft: PropTypes.bool,
  isNextDisabled: PropTypes.bool,
  onPressButtonOne: PropTypes.func,
  onPressButtonTwo: PropTypes.func,
};

export default SaveCancelButton;
