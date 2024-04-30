import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import getStyles from "../RangeSlider.styles";

const RailSelected = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <View style={styles.selectedRailStyle} />;
};

export default RailSelected;
