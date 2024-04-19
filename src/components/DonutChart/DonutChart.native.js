import React from "react";
import { useIntl } from "react-intl";
import { Dimensions, View } from "@unthinkable/react-core-components";
import { PieChart } from "react-native-chart-kit";

import { TwoRow } from "../../core/layouts";

import { convertMobileDonutChartData } from "../../utils/util";
import colors from "../../assets/colors";
import CommonText from "../CommonText";
import styles from "./DonutChart.style";

const DonutChart = ({ colorScale, data, label, height }) => {
  const intl = useIntl();
  const screenWidth = Dimensions.get("window").width;
  const legendData = convertMobileDonutChartData(data, colorScale);
  const chartConfig = {
    color: () => {},
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
        <View>
          <PieChart
            data={convertMobileDonutChartData(data, colorScale)}
            width={screenWidth * 0.75}
            height={height}
            chartConfig={chartConfig}
            accessor={"value"}
            backgroundColor={colors.white}
            absolute
            center={[screenWidth / 7, 0]}
            hasLegend={false}
          />
          <View style={styles.legendContainer}>
            {legendData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <CommonText style={styles.legendText}>
                  {intl.formatMessage({ id: `label.${item.name}` })}
                </CommonText>
              </View>
            ))}
          </View>
        </View>
      }
    />
  );
};

export default DonutChart;
