import React from "react";
import PropTypes from "prop-types";
import { Platform, Text, View } from "@unthinkable/react-core-components";

import Button from "../Button/Button";
import CustomImage from "../CustomImage";
import Spinner from "../Spinner";
import colors from "../../assets/colors";
import styles from "./CustomButton.style";

const CustomButton = ({
  children,
  disabled,
  iconRight,
  iconLeft,
  isLeftIconNotSvg,
  isLoading,
  isRightIconNotSvg,
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
        <View style={styles.containerStyle}>
          {!!iconLeft && !!iconLeft?.leftIconSource && (
            <CustomImage
              style={styles.iconRightStyle}
              alt={iconLeft.leftIconAlt}
              Icon={iconLeft.leftIconSource}
              isSvg={!isLeftIconNotSvg}
              source={iconLeft.leftIconSource}
            />
          )}
          <Text
            style={[withGreenBackground && styles.whiteText, styles.btnText]}
          >
            {children}
          </Text>
          {!!iconRight && !!iconRight?.rightIconSource && (
            <CustomImage
              style={styles.iconLeftStyle}
              Icon={iconRight.rightIconSource}
              isSvg={!isRightIconNotSvg}
              source={iconRight.rightIconSource}
              alt={iconRight.rightIconAlt}
            />
          )}
        </View>
      )}
    </Button>
  );
};

CustomButton.defaultProps = {
  children: <></>,
  disabled: false,
  iconLeft: {
    leftIconAlt: "",
    leftIconSource: "",
  },
  iconRight: {
    rightIconAlt: "",
    rightIconSource: "",
  },
  isLeftIconNotSvg: true,
  isLoading: false,
  isRightIconNotSvg: true,
  onPress: () => {},
  style: {},
  withGreenBackground: false,
};

CustomButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
  isLeftIconNotSvg: PropTypes.bool,
  isLoading: PropTypes.bool,
  isRightIconNotSvg: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  withGreenBackground: PropTypes.bool,
};

export default CustomButton;
