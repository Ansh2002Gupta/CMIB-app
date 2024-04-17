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
    borderRadius: 15,
    borderColor: colors.greyOne,
    backgroundColor: colors.white,
  },
  cellTextStyle: (fontSize = 14, fontWeight = "500") => ({
    fontSize: fontSize,
    fontWeight: fontWeight,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        redSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "120px",
      },
    }),
    flexWrap: "wrap",
    wordBreak: "break-word",
    overFlow: "hidden",
    whiteSpace: "break-space",
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  columnHeaderStyleWithBorder: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: colors.lightGrey,
  },
  tableSection: {
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    borderRadius: 16,
  },
  iconTicket: {
    height: 20,
    width: 20,
  },
  filterText: {
    marginLeft: 8,
    fontSize: 14,
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
  loadingStyle: {
    backgroundColor: colors.white,
    padding: 12,
    alignItems: "center",
  },
  noMoreData: {
    textAlign: "center",
    color: colors.lightGrey,
  },
  loadingStyleNoData: {
    backgroundColor: colors.white,
    alignItems: "center",
    padding: 30,
    borderRadius: 16,
  },
  textSize: {
    fontSize: 14,
  },
  ticketTotals: {
    marginBottom: 16,
    flexDirection: "row",
  },
  addTicketSection: { justifyContent: "space-between" },
  activeTickets: {
    backgroundColor: colors.green,
    height: 20,
    width: 20,
    borderRadius: 10,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTicketsText: {
    color: colors.white,
  },
  mobilePopUpPosition: {
    top: 10,
    right: -10,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: colors.lightGrey,
  },
  rowStyling: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
});

export default styles;
