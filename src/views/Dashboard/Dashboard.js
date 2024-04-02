import React, { useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import RangeSlider from "../../components/RangeSlider";
import styles from "./dashboard.style";
import JobProfileTab from "../JobProfile";

const MIN_VALUE = 0;
const MAX_VALUE = 100; // Created for demo purposes , therefore not defining them in the constant.js file
// Just ignore this file as just to test custom component
function DashboardView() {
  const intl = useIntl();
  const [range, setRange] = useState({ max: MAX_VALUE, min: MIN_VALUE });
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.dashboard" })}
      </CommonText>
      <RangeSlider
        label="Yrs"
        max={MAX_VALUE}
        min={MIN_VALUE}
        onChange={(obj) => {
          console.log(obj);
        }}
        step={5}
        {...{ range, setRange }}
      />
    </View>
  );
}

export default DashboardView;
