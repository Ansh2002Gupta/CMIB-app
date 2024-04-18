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
  pieChartContainer: {
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
});

export default styles;
