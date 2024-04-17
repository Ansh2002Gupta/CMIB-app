import React from "react";
import { Dimensions, View } from "@unthinkable/react-core-components";
import CommonText from "../CommonText";
import { PieChart as PieChartComponent } from "react-native-chart-kit";
import styles from "./PieChart.style";

const PieChart = () => {
  const screenWidth = Dimensions.get("window").width;

  const data = [
    {
      name: "Interviews Pending",
      population: 6,
      color: "orange",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Interviews Given",
      population: 8,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      <PieChartComponent
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[screenWidth / 4, 0]} // Adjust the center to move the donut chart within the view
        hasLegend={true}
        holeRadius={50} // The radius of the hole to create the donut effect
      />
    </View>
  );
};

export default PieChart;
