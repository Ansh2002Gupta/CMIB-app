import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  cellStyle: {
    borderWidth: 0.5,
    flex: 1,
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 24,
    paddingRight: 24,
    borderColor: colors.lightGrey,
  },
  tabelRow: {
    gap: 16,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 24,
    marginRight: 24,
  },
  tableStyle: {
    flex: 1,

    borderColor: colors.lightGrey,
    borderRadius: 16,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  cellTextStyle: (fontSize = 14) => ({
    fontSize,
    lineHeight: 20,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "100%",
      },
    }),
  }),
  tableContainerStyle: {
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  twoColumn: {
    flex: 1,
    gap: 16,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  tableTitleText: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
  },
  customTableStyle: {
    padding: 0,
    backgroundColor: colors.white,
    marginTop: 16,
    marginBottom: 16,
  },
  highLightedField: {
    backgroundColor: colors.skyBlueDark,
  },
  highlightCell: {
    backgroundColor: colors.secondaryGrey,
    fontWeight: "700",
  },
  tableHeadingContainer: {
    backgroundColor: colors.lightGreyThird,
  },
  tableHeadingText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
    color: colors.darkGrey,
  },
  requriedDocuments: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  badgeContainer: {
    marginTop: 24,
  },
});

export default styles;
