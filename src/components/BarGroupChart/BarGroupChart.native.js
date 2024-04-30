import React from "react";
import { useTheme } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import getStyles from "./BarGroupChart.style";

const BarGroupChart = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <CommonText>BarGroupChart</CommonText>;
};

export default BarGroupChart;
