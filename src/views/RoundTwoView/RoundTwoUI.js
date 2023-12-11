import React from "react";
import { useIntl } from "react-intl";
import { View, Text } from "@unthinkable/react-core-components";

import styles from "./roundTwo.style";

function RoundTwoUI(props) {
  const intl = useIntl();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {intl.formatMessage({ id: "label.round2" })}
      </Text>
    </View>
  );
}

export default RoundTwoUI;
