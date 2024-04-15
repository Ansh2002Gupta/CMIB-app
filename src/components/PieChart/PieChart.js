import React from "react";
import { VictoryPie } from "victory";
import CommonText from "../CommonText";

import { TwoRow } from "../../core/layouts";

import style from "./PieChart.style";

const PieChart = ({ label, data, colorScale, labelRadius, labelColor }) => {
  return (
    <TwoRow
      style={style.pieChartContainer}
      topSection={
        <CommonText customTextStyle={style.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        <VictoryPie
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
