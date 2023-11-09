import React from "react";
import { useIntl } from "react-intl";
import { Text, View } from "@unthinkable/react-core-components";

import Styles from "./HeaderName.style";

const HeaderName = () => {
  const intl = useIntl();
  return (
    <View>
      <Text style={Styles.heading}>{intl.formatMessage({ id: 'label.greetings' })} Samay!</Text>
    </View>
  );
};

export default HeaderName;
