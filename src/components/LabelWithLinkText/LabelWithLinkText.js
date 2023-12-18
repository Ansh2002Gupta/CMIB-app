import { View, TouchableOpacity } from "@unthinkable/react-core-components";
import React from "react";

import CommonText from "../CommonText";
import style from "./LabelWithLinkText.style";

const LabelWithLinkText = ({ labelText, linkText, onLinkClick }) => {
  return (
    <View style={style.textContainer}>
      <CommonText title={labelText} customTextStyle={style.labelTextStyle} />
      <TouchableOpacity onPress={() => onLinkClick()}>
        <CommonText customTextStyle={style.linkTextStyle} title={linkText} />
      </TouchableOpacity>
    </View>
  );
};

export default LabelWithLinkText;
