import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
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
      <CommonText customTextStyle={[style.heading, customTextStyle]} title={text} />
      <CommonText customTextStyle={[style.secondHeading, customSecondHeadingStyles]} title={label} />
    </View>
  );
};

export default HeaderText;
