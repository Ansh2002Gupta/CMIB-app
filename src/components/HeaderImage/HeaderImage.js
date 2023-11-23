import React from "react";
import { useIntl } from "react-intl";
import { Text, View, Image } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";

import Styles from "./HeaderImage.style";

const HeaderImage = ({ image1, text, image2 }) => {
  const intl = useIntl();
  const icons = useTheme("icons");
  return (
    <View style={{}}>
      <View style={Styles.imageView}>
        <Image source={image1} style={Styles.cmibImageStyle} />
        <Image source={image2} style={Styles.cmibTextStyle} />
      </View>
      <View style={Styles.textView}>
        <Text style={Styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default HeaderImage;
