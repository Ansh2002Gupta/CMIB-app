import React from "react";
import { Dimensions, View } from "@unthinkable/react-core-components";
import { BarChart as BarChartComponent } from "react-native-chart-kit";

import { TwoRow } from "../../core/layouts";

import { convertMobileBarData } from "../../utils/util";
import CommonText from "../CommonText";
import colors from "../../assets/colors";
import styles from "./BarChart.style";

const BarChart = ({ barColor, data, label, height }) => {
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: colors.white,
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: () => barColor,
    barPercentage: 0.5,
  };
  return (
    <TwoRow
      style={styles.container}
      topSection={
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        <BarChartComponent
          data={convertMobileBarData(data)}
          width={screenWidth * 0.75}
          height={height}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      }
      bottomSectionStyle={styles.bottomSectionStyle}
    />
  );
};

export default BarChart;
