import React from "react";
import { View } from "@unthinkable/react-core-components";

import { styles } from "../RangeSlider.styles";

const Notch = (props) => {
  return <View style={styles.notchStyle} {...props} />;
};

export default Notch;
