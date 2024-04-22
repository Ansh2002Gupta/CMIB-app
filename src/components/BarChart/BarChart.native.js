import React from "react";
import { Dimensions, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import { convertMobileBarData } from "../../utils/util";
import CommonText from "../CommonText";
import colors from "../../assets/colors";
import styles from "./BarChart.style";
import { BarChart as BarChartComponent } from "react-native-gifted-charts";

const BarChart = ({ barColor, data, label, height }) => {
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
