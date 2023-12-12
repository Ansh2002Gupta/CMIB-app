import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import styles from "./roundTwo.style";

function RoundTwo(props) {
  const intl = useIntl();

  return (
    <View style={styles.container}>
      <CommonText
        customTextStyle={styles.header}
        title={intl.formatMessage({ id: "label.round2" })}
      />
    </View>
  );
}

export default RoundTwo;
