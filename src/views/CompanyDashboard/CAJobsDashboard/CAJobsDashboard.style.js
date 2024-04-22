import { StyleSheet, Dimensions } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  viewOtherText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  mainContainer: {},
  activePackage: {
    background: colors.darkPurple,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  packageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  customTextStyle: {
    color: colors.lightPurple,
    fontSize: 14,
  },
  customSubHeadingStyle: {
    color: colors.white,
    fontSize: 32,
  },
  customButtonStyle: {
    maxHeight: 36,
    maxWidth: 114,
  },
  pieChartContiner: { gap: 24, flexDirection: "row", flexWrap: "wrap" },
  customHeaderText: {
    maxWidth: "80%",
  },
});

export default styles;
