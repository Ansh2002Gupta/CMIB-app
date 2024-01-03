import React from "react";
import PropTypes from "prop-types";
import { Platform, Text } from "@unthinkable/react-core-components";

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
          {!!iconLeft && (
            <CustomImage
              alt={"left-arrow"}
              Icon={iconLeft}
              isSvg
              source={iconLeft}
            />
          )}
          <Text
            style={[withGreenBackground && styles.whiteText, styles.btnText]}
          >
            {children}
          </Text>
          {!!iconRight && (
            <CustomImage
              Icon={iconRight}
              isSvg
              source={iconRight}
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
  iconLeft: "",
  iconRight: "",
  isLoading: false,
  onPress: () => {},
  style: {},
  withGreenBackground: false,
};

CustomButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  withGreenBackground: PropTypes.bool,
};

export default CustomButton;
