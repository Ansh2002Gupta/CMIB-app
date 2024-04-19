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
  donutChartContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },

  headerText: {
    fontSize: 16,
    color: colors.black,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    width: "50%",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: colors.black,
  },
});

export default styles;
