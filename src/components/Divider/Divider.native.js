import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import getStyles from "./Divider.style";

const Divider = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return <View style={styles.borderStyle} />;
};

export default Divider;
