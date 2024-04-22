import React from "react";
import { Dimensions, View } from "@unthinkable/react-core-components";
import { BarChart as BarChartComponent } from "react-native-chart-kit";

import { TwoRow } from "../../core/layouts";

import { convertMobileBarData } from "../../utils/util";
import CommonText from "../CommonText";
import colors from "../../assets/colors";
import styles from "./BarChart.style";
import { BarChart as BC } from "react-native-gifted-charts";

const BarChart = ({ barColor, data, label, height }) => {
  const screenWidth = Dimensions.get("window").width;
  const barData = [
    { value: 20, label: 'Company Name', frontColor: colors.purple },
    { value: 50, label: 'Company Name', frontColor: colors.purple },
    {
      value: 75, label: 'Company Name', frontColor: colors.purple
    },
    { value: 20, label: 'Company Name', frontColor: colors.purple },
    { value: 60, label: 'Company Name', frontColor: colors.purple },
    { value: 26, label: 'Company Name', frontColor: colors.purple },
    { value: 30, label: 'Company Name', frontColor: colors.purple },
  ];
  const chartConfig = {
    backgroundColor: colors.white,
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: () => barColor,
    barPercentage: 0.5,
  };
  return (
    <TwoRow
      style={styles.container}
      topSection={
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        <View style={{}}>
          <BC
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
            noOfSections={barData.length > 6 ? barData.length / 2 : barData.length}
            topLabelTextStyle={{ fontWeight: 'bold', color: colors.black }}
            rulesType="solid"
            autoShiftLabels={true}
            style={{ backgroundColor: 'red' }}
          />
        </View>
      }
      bottomSectionStyle={styles.bottomSectionStyle}
    />
  );
};

export default BarChart;
