import React from "react";
import { useTheme } from "@unthinkable/react-theme";

import getStyles from "./Divider.style";

const Divider = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return <hr style={styles.borderStyle} />;
};

export default Divider;
