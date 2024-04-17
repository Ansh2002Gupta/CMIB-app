import React from "react";
import { View } from "@unthinkable/react-core-components";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLine } from "victory";

import { TwoRow } from "../../core/layouts";

import { convertGraphData } from "../../utils/util";
import colors from "../../assets/colors";
import styles from "./BarChart.style";
import CommonText from "../CommonText";

const BarChart = ({ barColor, data, label }) => {
  return (
    <TwoRow
      style={styles.barChartContainer}
      topSection={
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        <VictoryChart domainPadding={20} height={200} style={{ padding: 0 }}>
          <VictoryAxis
            style={{
              tickLabels: {
                fontSize: 8,
                padding: 5,
                fill: colors.darkGrey,
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "none" },
              tickLabels: { fontSize: 8, padding: 5, fill: colors.darkGrey },
            }}
          />

          <VictoryBar
            data={convertGraphData(data)}
            style={{ data: { fill: barColor, strokeWidth: 2 } }}
          />
        </VictoryChart>
      }
    />
  );
};

export default BarChart;
