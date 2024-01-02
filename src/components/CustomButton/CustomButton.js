import React from "react";
import PropTypes from "prop-types";
import { Text } from "@unthinkable/react-core-components";

import Button from "../Button/Button";
import Spinner from "../Spinner";
import colors from "../../assets/colors";
import styles from "./CustomButton.style";

const CustomButton = ({
  children,
  disabled,
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
      {...{ onPress }}
    >
      <Text style={styles.btnText}>{children}</Text>
      {isLoading && (
        <Spinner
          size="xs"
          thickness={3}
          color={withGreenBackground ? colors.white : ""}
        />
      )}
    </Button>
  );
};

CustomButton.defaultProps = {
  children: <></>,
  disabled: false,
  isLoading: false,
  onPress: () => {},
  style: {},
  withGreenBackground: false,
};

CustomButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  withGreenBackground: PropTypes.bool,
};

export default CustomButton;
