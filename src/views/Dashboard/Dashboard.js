import React from "react";
import { useIntl } from "react-intl";
import { View, Text } from "@unthinkable/react-core-components";

import styles from "./dashboard.style";

function DashboardView(props) {
  const intl = useIntl();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </Text>
    </View>
  );
}

export default DashboardView;
