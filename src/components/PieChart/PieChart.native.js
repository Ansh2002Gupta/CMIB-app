import React from "react";
import { Dimensions, View } from "@unthinkable/react-core-components";
import { PieChart as PieChartComponent } from "react-native-chart-kit";

import { TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import { convertMobileGraphData } from "../../utils/util";
import colors from "../../assets/colors";
import styles from "./PieChart.style";

const PieChart = ({ colorScale, data, height, label }) => {
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    color: () => {},
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
        <PieChartComponent
          data={convertMobileGraphData(data, colorScale)}
          width={screenWidth * 0.75}
          height={height * 0.5}
          chartConfig={chartConfig}
          accessor={"value"}
          backgroundColor={colors.white}
          absolute
          center={[0, 0]}
          hasLegend={true}
        />
      }
    />
  );
};

export default PieChart;
