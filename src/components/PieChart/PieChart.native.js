import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { Dimensions, View, Text } from "@unthinkable/react-core-components";
import { PieChart as PieChartComponent } from "react-native-chart-kit";

import { TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import { convertMobileGraphData } from "../../utils/util";
import Pie from "react-native-pie";
import getStyles from "./PieChart.style";

const PieChart = ({ colorScale, data, height, label }) => {
  const screenWidth = Dimensions.get("window").width;
  const theme = useTheme();
  const styles = getStyles(theme);

  const sections = data.map((value, index) => ({
    percentage: data[index].value,
    color: colorScale[index],
  }));

  const labelChart = data.map((value, index) => ({
    label: data[index].label,
    color: colorScale[index],
  }));

  const labelView = () => {
    return (
      <View style={styles.labelContainer}>
        {labelChart.map((el) => (
          <View style={styles.labelView}>
            <View
              style={[styles.labelColorView, { backgroundColor: el?.color }]}
            />
            <Text style={styles.labelText}>{el?.label}</Text>
          </View>
        ))}
      </View>
    );
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
        <>
          <View style={[{ width: screenWidth }, styles.pieChartView]}>
            <Pie
              radius={60}
              innerRadius={40}
              sections={sections}
              dividerSize={2}
              strokeCap={"butt"}
            />
            {labelView()}
          </View>
        </>
      }
    />
  );
};

export default PieChart;
