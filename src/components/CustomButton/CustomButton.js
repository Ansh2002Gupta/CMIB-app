import React from "react";
import PropTypes from "prop-types";
import { Platform, Text } from "@unthinkable/react-core-components";

import Button from "../Button/Button";
import CustomImage from "../CustomImage";
import Spinner from "../Spinner";
import colors from "../../assets/colors";
import images from "../../images";
import styles from "./CustomButton.style";

const CustomButton = ({
  children,
  disabled,
  hasIconRight,
  hasIconLeft,
  isLoading,
  onPress,
  style,
  withGreenBackground,
}) => {
  return (
    <Button
      style={{
        ...styles.defaultBtnStyles,
        ...(withGreenBackground ? styles.greenBtn : {}),
        ...style,
      }}
      disabled={isLoading || disabled}
      onPress={onPress}
    >
      {isLoading ? (
        <Spinner
          size={Platform.OS === "web" && "xs"}
          thickness={3}
          color={withGreenBackground ? colors.white : ""}
        />
      ) : (
        <>
          {hasIconLeft && (
            <CustomImage
              alt={"left-arrow"}
              Icon={images.iconArrowLeft}
              isSvg
              source={images.iconArrowLeft}
            />
          )}
          <Text
            style={[withGreenBackground && styles.whiteText, styles.btnText]}
          >
            {children}
          </Text>
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
    </Button>
  );
};

CustomButton.defaultProps = {
  children: <></>,
  disabled: false,
  hasIconLeft: images.iconArrowLeft,
  hasIconRight: images.iconArrowRightWhite,
  isLoading: false,
  onPress: () => {},
  style: {},
  withGreenBackground: false,
};

CustomButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  hasIconLeft: PropTypes.string,
  hasIconRight: PropTypes.string,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  withGreenBackground: PropTypes.bool,
};

export default CustomButton;
