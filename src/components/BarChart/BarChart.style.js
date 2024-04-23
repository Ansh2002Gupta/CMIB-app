import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    marginBottom: 16,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },

  barChartContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },

  headerText: {
    fontFamily: "General Sans",
    fontSize: 16,
    color: colors.black,
  },
  tickLabels: {
    fontFamily: "General Sans",
    fontSize: 6,
    padding: 5,
    fontWeight: "500",
    fill: colors.darkGrey,
  },
  axisLabel: {
    fontSize: 7,
    padding: 35,
    fill: colors.darkGrey,
    fontFamily: "General Sans",
    fontWeight: "500",
  },
  gridLine: { stroke: colors.secondaryGrey, strokeWidth: 1 },
  barStyles: (barColor) => ({ fill: barColor, strokeWidth: 2 }),
  strokeNone: { stroke: "none" },
  flyoutStyle: {
    fill: colors.white,
    stroke: colors.lightGrey,
    strokeWidth: 0.5,
  },
  tooltipStyle: {
    fill: colors.black,
    fontFamily: "General Sans",
    fontSize: 8,
  },
  bottomSectionStyle: {
    marginTop: 12,
  },
  topLabelTextStyle: {
    fontWeight: 'bold', color: colors.black
  }
});

export default styles;
