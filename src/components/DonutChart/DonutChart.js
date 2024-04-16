import React from "react";
import { VictoryPie } from "victory";
import CommonText from "../CommonText";

import { TwoRow } from "../../core/layouts";

import styles from "./DonutChart.style";

const DonutChart = ({
  colorScale,
  data,
  height,
  label,
  labelColor,
  labelRadius,
}) => {
  return (
    <TwoRow
      style={styles.donutChartContainer}
      topSection={
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        <VictoryPie
          height={height}
          data={data}
          innerRadius={100}
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

export default DonutChart;
