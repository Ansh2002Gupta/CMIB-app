import React from "react";
import { useIntl } from "react-intl";
import { VictoryPie, VictoryLegend } from "victory";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import { convertDonutChartData } from "../../utils/util";
import getStyles from "./DonutChart.style";

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
  const convertedData = convertDonutChartData(data);
  const intl = useIntl();
  const theme = useTheme();

  const styles = getStyles(theme);

  return (
    <TwoRow
      style={styles.donutChartContainer}
      topSection={
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        <View>
          <VictoryPie
            height={height}
            width={width}
            data={convertDonutChartData(data)}
            innerRadius={innerRadius}
            colorScale={colorScale}
            labelRadius={({ innerRadius }) => innerRadius + labelRadius}
            style={{
              labels: {
                fill: labelColor,
              },
            }}
          />

          <VictoryLegend
            itemsPerRow={3}
            x={0}
            y={0}
            orientation="horizontal"
            gutter={30}
            height={60}
            data={convertedData?.map((item, index) => ({
              name: `${intl.formatMessage({ id: `label.${item.x}` })}  ${
                item.y
              }`,
              symbol: { fill: colorScale[index] },
            }))}
          />
        </View>
      }
    />
  );
};

export default DonutChart;
