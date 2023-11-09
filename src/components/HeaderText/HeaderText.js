import React from "react";
import { Text, View } from "@unthinkable/react-core-components";
import Styles from "./HeaderText.style";

const HeaderText = ({text}) => {
  return (
    <View>
      <Text style={Styles.heading}>{text}</Text>
    </View>
  );
};

export default HeaderText;
