import React from "react";
import { Text, View } from "@unthinkable/react-core-components";
import Styles from "./HeaderText.style";

const HeaderText = ({ text, label }) => {
  return (
    <View>
      <Text style={Styles.heading}>{text}</Text>
      <Text style={Styles.secoundHeading}>{label}</Text>
    </View>
  );
};

export default HeaderText;
