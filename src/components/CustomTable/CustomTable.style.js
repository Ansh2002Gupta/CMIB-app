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
  tableHeadingText: {
    color: colors.darkGrey,
  },
  tableQueryText: {
    marginTop: 2,
    color: colors.darkGrey,
  },
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
