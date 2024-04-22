import {
  Dimensions,
  Platform,
  StyleSheet,
} from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const screenWidth = Dimensions.get("window").width;

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
    ...Platform.select({
      web: {
        flexShrink: 1,
        flexWrap: "wrap",
        wordBreak: "break-word",
        maxWidth: screenWidth > 1250 ? screenWidth * 0.4 : screenWidth * 0.3,
      },
    }),
  },
  legendContainer: {
    flexDirection: "column",
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
