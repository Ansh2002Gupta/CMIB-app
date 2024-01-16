import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const baseStatusCellStyle = {
  textAlign: "center",
  marginRight: 16,
  paddingLeft: 8,
  paddingRight: 8,
  paddingTop: 2,
  paddingBottom: 2,
};

const styles = StyleSheet.create({
  cellTextStyle: (fontSize = 14) => ({
    fontSize,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "100%",
      },
    }),
  }),
  inProgress: {
    ...baseStatusCellStyle,
    color: colors.skyBlueDark,
  },
  pending: {
    ...baseStatusCellStyle,
    color: colors.orange,
  },
  close: {
    ...baseStatusCellStyle,
    color: colors.darkGreen,
  },
  inProgressWeb: {
    ...baseStatusCellStyle,
    backgroundColor: colors.skyBlueLight,
    color: colors.skyBlueDark,
  },
  pendingWeb: {
    ...baseStatusCellStyle,
    color: colors.orange,
    backgroundColor: colors.lightOrange,
  },
  closeWeb: {
    ...baseStatusCellStyle,
    color: colors.darkGreen,
    backgroundColor: colors.lightGreen,
  },
  tableHeadingText: {
    fontWeight: "600",
    color: colors.darkGrey,
  },
  columnStyle: (WIDTH = "15%") => ({
    width: WIDTH,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
  }),
  iconTicket: {
    height: 20,
    width: 20,
  },
  statusStyle: {
    alignItems: "flex-start",
  },
  iconTicketColoum: {
    alignItems: "center",
  },
});

export default styles;
