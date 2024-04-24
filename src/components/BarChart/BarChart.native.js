import React from "react";
import useTheme from "";
import { Dimensions, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import { BarChart as BarChartComponent } from "react-native-gifted-charts";
import getStyles from "./BarChart.style";

const BarChart = ({ barColor, data, label, height }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <TwoRow
      style={styles.container}
      topSection={
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        <View>
          <BarChartComponent
            horizontal
            barWidth={22}
            barBorderRadius={4}
            frontColor={barColor}
            data={data}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisLabelTextStyle={{ fontSize: 10, paddingTop: 6 }}
            xAxisTextNumberOfLines={2}
            xAxisLabelsHeight={40}
            showValuesAsTopLabel
            roundedBottom={false}
            roundedTop={false}
            noOfSections={data.length}
            topLabelTextStyle={styles.topLabelTextStyle}
            rulesType="solid"
            autoShiftLabels={true}
          />
        </View>
      }
      bottomSectionStyle={styles.bottomSectionStyle}
    />
  );
};

export default BarChart;
