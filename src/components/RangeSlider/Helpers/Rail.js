import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import getStyles from "../RangeSlider.styles";

const Rail = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <View style={styles.railStyle} />;
};

export default Rail;
