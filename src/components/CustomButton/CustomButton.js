import React from "react";
import PropTypes from "prop-types";
import { Platform, View } from "@unthinkable/react-core-components";

import Button from "../Button";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import Spinner from "../Spinner";
import colors from "../../assets/colors";
import styles from "./CustomButton.style";

const CustomButton = ({
  children,
  disabled,
  iconRight,
  iconLeft,
  isLoading,
  onPress,
  style,
  type,
  withGreenBackground,
}) => {
  const webProps = Platform.OS === "web" ? { size: "xs" } : {};

  return (
    <Button
      style={{
        ...styles.defaultBtnStyles,
        ...(withGreenBackground ? styles.greenBtn : {}),
        ...style,
      }}
      disabled={isLoading || disabled}
      onPress={onPress}
      type={type}
    >
      {isLoading ? (
        <Spinner
          thickness={3}
          color={withGreenBackground || isLoading ? colors.white : ""}
          {...webProps}
        />
      ) : (
        <View style={styles.containerStyle}>
          {!!iconLeft && !!iconLeft?.leftIconSource && (
            <CustomImage
              style={styles.iconRightStyle}
              alt={iconLeft.leftIconAlt}
              Icon={iconLeft.leftIconSource}
              isSvg={!iconLeft.isLeftIconNotSvg}
              source={iconLeft.leftIconSource}
            />
          )}
          <CommonText
            customTextStyle={[
              withGreenBackground && styles.whiteText,
              styles.btnText,
            ]}
            fontWeight={"600"}
          >
            {children}
          </CommonText>
          {!!iconRight && !!iconRight?.rightIconSource && (
            <CustomImage
              style={styles.iconLeftStyle}
              Icon={iconRight.rightIconSource}
              isSvg={!iconRight.isRightIconNotSvg}
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
    isLeftIconNotSvg: false,
    leftIconAlt: "",
    leftIconSource: "",
  },
  iconRight: {
    isRightIconNotSvg: false,
    rightIconAlt: "",
    rightIconSource: "",
  },
  isLoading: false,
  onPress: () => {},
  style: {},
  type: "",
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
  type: PropTypes.string,
  withGreenBackground: PropTypes.bool,
};

export default CustomButton;
