import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { TwoRow } from "../../core/layouts";
import { convertGraphData } from "../../utils/util";
import CommonText from "../CommonText";
import getStyles from "./BarChart.style";

const BarChart = ({
  barColor,
  barWidth = 10,
  data,
  domainPadding,
  height,
  label,
  toolTipLabel,
  xAxisLabel,
  yAxisLabel,
  xAxisTickAngle,
  yAxisTickFormat,
  xAxisTickFormat,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
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

          <VictoryBar
            barWidth={barWidth}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={convertGraphData(data)}
            style={{ data: styles.barStyles(barColor) }}
          />
        </VictoryChart>
      }
    />
  );
};

export default BarChart;
