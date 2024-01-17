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
        maxWidth: "120px",
      },
    }),
  }),
  pending: {
    color: colors.orange,
  },
  published: {
    ...baseStatusCellStyle,
    color: colors.skyBlueDark,
  },
  notPublished: {
    ...baseStatusCellStyle,
    color: colors.darkBlueShade,
  },
  pendingWeb: {
    ...baseStatusCellStyle,
    backgroundColor: colors.lightOrange,
    color: colors.orange,
  },
  publishedWeb: {
    ...baseStatusCellStyle,
    color: colors.skyBlueDark,
    backgroundColor: colors.skyBlueLight,
  },
  notPublishedWeb: {
    ...baseStatusCellStyle,
    color: colors.darkBlueShade,
    backgroundColor: colors.greyOne,
  },
  tableHeadingText: {
    color: colors.darkGrey,
  },
  columnStyle: (WIDTH: "15%") => ({
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
