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
  twoColumnWeb: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  twoColumn: {
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
    margin: 16,
  },
  badgeContainer: {
    marginTop: 24,
  },
  loaderStyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
  commonTable: { flex: 1 },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: colors.black,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    color: colors.black,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commonTableCell: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  yearlyData: {
    marginTop: 16,
  },
  mobileCommonTable: {
    marginBottom: 8,
  },
  mobileCommonTableCard: {
    paddingBottom: 16,
  },
  dot: {
    height: 4,
    width: 4,
    backgroundColor: colors.darkGrey,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 2,
  },
  documentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  docName: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: colors.black,
  },
  docText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    color: colors.darkGrey,
  },
  docItem: {
    paddingTop: 11,
    paddingBottom: 11,
  },
  docItemBorder: {
    borderBottomWidth: 1,
    borderColor: colors.greyOne,
  },
  categoriesStyle: {
    color: colors.darkBlue,
    marginLeft: 5,
  },
  placeHeadingStyle: {
    fontSize: 14,
    marginBottom: 2,
  },
  totalPositionStyle: {
    color: colors.darkGrey,
  },
  iconArrow: {
    height: 16,
    width: 16,
    marginLeft: 5,
  },
  mainRowContainer: {
    marginTop: 11,
    marginBottom: 11,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoriesOptionsStyle: {
    marginRight: 5,
    marginTop: 5,
    color: colors.darkGrey,
  },
  container: {
    paddingBottom: 16,
  },
});

export default styles;
