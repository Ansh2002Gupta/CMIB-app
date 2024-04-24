import React from "react";
import PropTypes from "prop-types";
import { BarChart as BarChartComponent } from "react-native-gifted-charts";

import { TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import styles from "./BarChart.style";

const BarChart = ({ barColor, data, label }) => {
  return (
    <TwoRow
      style={styles.container}
      topSection={
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {label}
        </CommonText>
      }
      bottomSection={
        !!data?.length ? (
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
            autoShiftLabels
          />
        ) : null
      }
      bottomSectionStyle={styles.bottomSectionStyle}
    />
  );
};

BarChart.propTypes = {
  barColor: PropTypes.string,
  data: PropTypes.array,
  label: PropTypes.string,
};

export default BarChart;
