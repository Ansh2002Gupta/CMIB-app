import React from "react";
import { VictoryPie } from "victory";
import { View } from "@unthinkable/react-core-components";
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
        // <VictoryPie
        //   height={height}
        //   width={width}
        //   data={data}
        //   innerRadius={100}
        //   colorScale={colorScale}
        //   labelRadius={({ innerRadius }) => innerRadius + labelRadius}
        //   style={{
        //     labels: { fill: labelColor, fontSize: 20, fontWeight: "600" },
        //   }}
        // />
        <View>
          <svg viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
            {/* Outer Donut Chart */}
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              data={dataLevelOne}
              innerRadius={120}
              labelRadius={100}
              colorScale={colorScale}
              style={{ labels: { fontSize: 20, fill: "white" } }}
            />
            {/* Inner Donut Chart */}
            <VictoryPie
              standalone={false}
              width={400}
              height={400}
              colorScale={colorScale}
              data={dataLevelTwo}
              innerRadius={70}
              labelRadius={50}
              style={{ labels: { fontSize: 15, fill: "white" } }}
            />
          </svg>
        </View>
      }
    />
  );
};

export default DonutChart;
