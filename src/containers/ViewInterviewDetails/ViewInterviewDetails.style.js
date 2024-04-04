import { StyleSheet, Dimensions } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const { height: deviceHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  headerText: {
    color: colors.darkGrey,
    fontSize: 14,
  },
  formalText: {
    fontSize: 14,
    flexWrap: "wrap",
    maxWidth: 480,
    wordBreak: "break-word",
    overFlow: "hidden",
    whiteSpace: "break-space",
  },
  redText: {
    color: colors.red,
  },
  headingContainer: {
    flexDirection: "row",
    paddingBottom: 8,
    paddingTop: 8,
  },
  detailsSection: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    flexWrap: "wrap",
  },
  headingText: {
    fontSize: 16,
  },
  modalInnerContainer: {
    maxHeight: deviceHeight * 0.6,
  },
});

export default styles;
