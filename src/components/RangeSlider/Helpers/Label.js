import React from "react";
import { useTheme } from "@unthinkabkle/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../CommonText";
import getStyles from "../RangeSlider.styles";

const Label = ({ text }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.labelStyle}>
      <CommonText>{text}</CommonText>
    </View>
  );
};

export default Label;
