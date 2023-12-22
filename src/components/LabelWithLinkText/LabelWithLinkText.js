import { View, TouchableOpacity } from "@unthinkable/react-core-components";
import React from "react";

import CommonText from "../CommonText";
import style from "./LabelWithLinkText.style";

const LabelWithLinkText = ({ labelText, linkText, onLinkClick }) => {
  return (
    <View style={style.textContainer}>
      {!!labelText && <CommonText title={labelText} customTextStyle={style.labelTextStyle} />}
      {!!linkText && <TouchableOpacity onPress={() => onLinkClick()}>
        <CommonText customTextStyle={style.linkTextStyle} title={linkText} />
      </TouchableOpacity>}
    </View>
  );
};

export default LabelWithLinkText;
