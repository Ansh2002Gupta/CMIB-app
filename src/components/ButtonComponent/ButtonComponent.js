import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity/CustomTouchableOpacity";
import CustomImage from "../CustomImage";
import images from "../../images";
import colors from "../../assets/colors";
import styles from "./ButtonComponent.style";

const ButtonComponent = (props) => {
  const {
    title,
    onPress,
    disabled,
    customTitleStyle,
    customButtonContainer,
    hasIconRight,
    displayLoader,
  } = props;
  return (
    <CustomTouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonStyle,
        disabled && styles.disableButtonStyle,
        customButtonContainer,
      ]}
      disabled={disabled || displayLoader}
    >
      {displayLoader ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <>
          <CommonText
            customTextStyle={[styles.titleStyle, customTitleStyle]}
            fontWeight={customTitleStyle?.fontWeight || "600"}
          >
            {title}
          </CommonText>
          {hasIconRight && (
            <CustomImage
              Icon={images.iconArrowRightWhite}
              isSvg
              source={images.iconArrowRightWhite}
              alt={"right-arrow"}
            />
          )}
        </>
      )}
    </CustomTouchableOpacity>
  );
};

ButtonComponent.defaultProps = {
  customButtonContainer: {},
  customTitleStyle: {},
  disabled: false,
  displayLoader: false,
  hasIconRight: false,
};

ButtonComponent.propTypes = {
  customButtonContainer: PropTypes.object,
  customTitleStyle: PropTypes.object,
  disabled: PropTypes.bool,
  displayLoader: PropTypes.bool,
  hasIconRight: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ButtonComponent;
