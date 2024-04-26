import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import getStyles from "../RangeSlider.styles";

const Notch = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <View style={styles.notchStyle} />;
};

export default Notch;
