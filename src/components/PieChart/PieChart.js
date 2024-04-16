import React from "react";
import { VictoryPie } from "victory";
import CommonText from "../CommonText";

import { TwoRow } from "../../core/layouts";

import styles from "./PieChart.style";

const PieChart = ({
  colorScale,
  data,
  height,
  label,
  labelRadius,
  labelColor,
}) => {
  return (
    <TwoRow
      style={styles.pieChartContainer}
      topSection={
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        <VictoryPie
          height={height}
          data={data}
          colorScale={colorScale}
          labelRadius={({ innerRadius }) => innerRadius + labelRadius}
          style={{
            labels: { fill: labelColor, fontSize: 20, fontWeight: "600" },
          }}
        />
      }
    />
  );
};

export default PieChart;
