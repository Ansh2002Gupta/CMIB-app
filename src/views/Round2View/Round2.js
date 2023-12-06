import React from "react";
import { useIntl } from "react-intl";
import { View, Text } from "@unthinkable/react-core-components";

import styles from "./round2.style";

function Round2(props) {
  const intl = useIntl();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {intl.formatMessage({ id: "label.round2" })}
      </Text>
    </View>
  );
}

export default Round2;
