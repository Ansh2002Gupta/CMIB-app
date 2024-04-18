import React from "react";
import { Dimensions, View } from "@unthinkable/react-core-components";
import { PieChart as PieChartComponent } from "react-native-chart-kit";

import { TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import { convertMobileGraphData } from "../../utils/util";
import colors from "../../assets/colors";
import styles from "./PieChart.style";
import { color } from "../../constants/constants";

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
          height={height}
          chartConfig={chartConfig}
          accessor={"value"}
          backgroundColor={colors.white}
          absolute
          center={[screenWidth / 15, 0]}
          hasLegend={true}
          innerRadius={"45%"} // This creates the doughnut hole
          outerRadius={"90%"} // This sets the overall size of the chart
        />
      }
    />
  );
};

export default PieChart;
