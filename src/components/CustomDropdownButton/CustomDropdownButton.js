import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";

import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CommonText from "../CommonText";
import images from "../../images";
import getStyles from "./CustomDropdownButton.style";

const CustomDropdownButton = ({
  text,
  onPress,
  customIconStyle,
  fontWeight,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [buttonPressed, setButtonPressed] = useState(false);

  const handlePress = () => {
    setButtonPressed((prev) => !prev);
  };
  return (
    <CustomTouchableOpacity
      onPress={() => {
        onPress();
        handlePress();
      }}
    >
      <CommonText customTextStyle={styles.textStyle} fontWeight={fontWeight}>
        {text}
      </CommonText>
      <CustomImage
        source={buttonPressed ? images.iconArrowDown : images.iconArrowUp}
        style={{ ...styles.iconStyle, ...customIconStyle }}
        isSvg={false}
      />
    </CustomTouchableOpacity>
  );
};

CustomDropdownButton.defaultProps = {
  text: "",
  onPress: () => {},
  customIconStyle: {},
  fontWeight: "600",
};

CustomDropdownButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  customIconStyle: PropTypes.object,
  fontWeight: PropTypes.number,
};

export default CustomDropdownButton;
