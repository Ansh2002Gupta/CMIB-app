import React from "react";
import { useIntl } from "react-intl";
import { Text, View } from "@unthinkable/react-core-components";

import Styles from "./HeaderName.style";

const HeaderName = ({text, customTextStyle}) => {
  return (
    <View>
      <Text style={[Styles.heading, customTextStyle]}>{text}</Text>
    </View>
  );
};

export default HeaderName;
