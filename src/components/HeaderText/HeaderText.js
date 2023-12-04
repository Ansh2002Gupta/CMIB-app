import React from "react";
import { Text, View } from "@unthinkable/react-core-components";
import style from "./HeaderText.style";

const HeaderText = ({
  text,
  label,
  customTextStyle,
  customSecondHeadingStyles,
  customContainerStyles,
}) => {
  return (
    <View style={[style.headerContainer, customContainerStyles]}>
      <Text style={[style.heading, customTextStyle]}>{text}</Text>
      <Text style={[style.secoundHeading, customSecondHeadingStyles]}>
        {label}
      </Text>
    </View>
  );
};

export default HeaderText;
