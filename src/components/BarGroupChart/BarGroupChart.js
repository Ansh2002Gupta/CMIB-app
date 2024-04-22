import React from "react";
import { Dimensions } from "@unthinkable/react-core-components";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryGroup,
  VictoryLegend,
} from "victory";
import { TwoRow } from "../../core/layouts";
import { convertGraphData } from "../../utils/util";
import styles from "./BarGroupChart.style";
import CommonText from "../CommonText";

const BarGroupChart = ({
  barColor1,
  barColor2,
  barWidth = 10,
  data1,
  data2,
  domainPadding,
  height,
  label,
  legendData,
  toolTipLabel,
  offset,
  xAxisLabel,
  yAxisLabel,
  xAxisTickAngle,
  yAxisTickFormat,
  xAxisTickFormat,
}) => {
  return (
    <TwoRow
      style={styles.barChartContainer}
      topSection={
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        <VictoryChart
          domainPadding={domainPadding}
          height={height}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labels={toolTipLabel}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={2}
                  style={styles.tooltipStyle}
                  flyoutStyle={styles.flyoutStyle}
                />
              }
            />
          }
        >
          <VictoryAxis
            label={xAxisLabel}
            tickFormat={xAxisTickFormat}
            style={{
              axis: styles.gridLine,
              tickLabels: { ...styles.tickLabels, angle: xAxisTickAngle },
              axisLabel: styles.axisLabel,
            }}
          />
          <VictoryAxis
            dependentAxis
            label={yAxisLabel}
            tickFormat={yAxisTickFormat}
            style={{
              axis: styles.strokeNone,
              tickLabels: styles.tickLabels,
              axisLabel: styles.axisLabel,
              grid: styles.gridLine,
            }}
          />
          <VictoryLegend
            x={Dimensions.get("window").width - 1120}
            y={40}
            orientation="horizontal"
            gutter={20}
            style={{
              border: styles.strokeNone,
              labels: styles.legendLabel,
            }}
            data={legendData}
          />
          <VictoryGroup offset={offset}>
            <VictoryBar
              barWidth={barWidth}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              data={convertGraphData(data1)}
              style={{ data: styles.barStyles(barColor1) }}
            />
            <VictoryBar
              barWidth={barWidth}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              data={convertGraphData(data2)}
              style={{ data: styles.barStyles(barColor2) }}
            />
          </VictoryGroup>
        </VictoryChart>
      }
    />
  );
};

export default BarGroupChart;
