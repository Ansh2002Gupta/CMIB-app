import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import RangeSlider from "../../components/RangeSlider";
import styles from "./dashboard.style";

// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </CommonText>
      <RangeSlider
        label="Yrs"
        min={0}
        max={100}
        onChange={(obj) => {
          console.log(obj);
        }}
      />
    </View>
  );
}

export default DashboardView;
