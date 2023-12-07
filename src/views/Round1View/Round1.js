import React from "react";
import { useIntl } from "react-intl";
import { View, Text } from "@unthinkable/react-core-components";

import styles from "./round1.style";

function Round1(props) {
  const intl = useIntl();

  return (
    <View style={styles.main}>
      <View></View>
      <View style={styles.container}>
        <View style={styles.componentView}>

        </View>
      </View>
    </View>
  );
}

export default Round1;
