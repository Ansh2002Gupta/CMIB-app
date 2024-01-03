import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
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
        <CommonText
          customTextStyle={styles.disableTextStyle}
          title={buttonOneText}
        />
      </CustomTouchableOpacity>
      <CustomTouchableOpacity
        onPress={onPressButtonTwo}
        style={[
          styles.buttonStyle,
          styles.secondButotnStyle,
          isNextDisabled && styles.disableStyle,
        ]}
        disabled={isNextDisabled || displayLoader}
      >
        {displayLoader ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <>
            <CommonText
              customTextStyle={styles.titleStyle}
              title={buttonTwoText}
            />
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
