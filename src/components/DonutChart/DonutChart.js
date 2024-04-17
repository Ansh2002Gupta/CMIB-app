import React from "react";
import { VictoryPie } from "victory";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../CommonText";

import { TwoRow } from "../../core/layouts";

import { convertGraphData } from "../../utils/util";
import styles from "./DonutChart.style";

const DonutChart = ({
  colorScale,
  data,
  height,
  innerRadius,
  label,
  labelColor,
  labelRadius,
  width,
}) => {
  const dataLevelOne = [
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 },
  ];

  const dataLevelTwo = [
    { x: "Cats", y: 20 },
    { x: "Dogs", y: 30 },
    { x: "Birds", y: 50 },
  ];
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
          width={width}
          data={convertGraphData(data)}
          innerRadius={innerRadius}
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
