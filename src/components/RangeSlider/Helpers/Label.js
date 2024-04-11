import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../CommonText";
import { styles } from "../RangeSlider.styles";

const Label = ({ text }) => {
  return (
    <View style={styles.labelStyle}>
      <CommonText>{text}</CommonText>
    </View>
  );
};

export default Label;
