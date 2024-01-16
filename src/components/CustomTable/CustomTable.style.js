import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    padding: 24,
  },
  mobileMainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
  mobileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderColor: colors.greyOne,
    backgroundColor: colors.white,
  },
  cellTextStyle: (fontSize = 14, fontWeight = "500") => ({
    fontSize: fontSize,
    fontWeight: fontWeight,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "120px",
      },
    }),
  }),
  inProgress: {
    textAlign: "center",
    marginRight: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.orange,
  },
  pending: {
    textAlign: "center",
    marginRight: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.skyBlueDark,
  },
  close: {
    textAlign: "center",
    marginRight: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.darkGreen,
  },
  inProgressWeb: {
    textAlign: "center",
    paddingLeft: 8,
    borderRadius: 16,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: colors.lightOrange,
    color: colors.orange,
  },
  pendingWeb: {
    textAlign: "center",
    borderRadius: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.skyBlueDark,
    backgroundColor: colors.skyBlueLight,
  },
  closeWeb: {
    borderRadius: 16,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.darkGreen,
    backgroundColor: colors.lightGreen,
  },
  tableHeadingText: {
    color: colors.darkGrey,
  },
  tableQueryText: {
    marginTop: 2,
    color: colors.darkGrey,
  },
  columnStyle: (WIDTH: "15%") => ({
    width: WIDTH,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
  }),
  columnStyleBorder: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderTopWidth: 0.5,
  },
  columnHeaderStyle: {
    backgroundColor: colors.white,
  },
  tableSection: {
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    borderRadius: 16,
    overflow: "hidden",
  },
  iconTicket: {
    height: 20,
    width: 20,
  },
  filterText: {
    marginLeft: 8,
  },
  imageParentStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginLeft: 16,
    padding: 12,
  },
  rowSelectedNumber: {
    fontSize: 14,
    marginRight: 8,
  },
  rowsPerPageWeb: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomPaginationStyle: {
    alignSelf: "center",
  },
  filterTopSection: (isWebView) => ({
    marginBottom: 16,
    width: isWebView ? "40%" : "100%",
  }),
  tableTopSection: {
    flex: 1,
  },
  tableTopSectionStyle: (isWebView) => ({
    height: isWebView ? "100%" : "80%",
  }),
});

export default styles;
