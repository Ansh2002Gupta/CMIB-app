import React from "react";
import { Text, View } from "@unthinkable/react-core-components";
import style from "./HeaderText.style";

const HeaderText = ({ text, label, customTextStyle }) => {
  return (
    <View style={style.headerContainer}>
      <Text style={[style.heading, customTextStyle]}>{text}</Text>
      <Text style={style.secoundHeading}>{label}</Text>
    </View>
  );
};

export default HeaderText;
