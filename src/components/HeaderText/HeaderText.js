import React from "react";
import { Text, View } from "@unthinkable/react-core-components";
import Styles from "./HeaderText.style";

const HeaderText = ({text, customTextStyle}) => {
  return (
    <View>
      <Text style={[Styles.heading, customTextStyle]}>{text}</Text>
    </View>
  );
};

export default HeaderText;
