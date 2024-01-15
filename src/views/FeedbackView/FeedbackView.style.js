import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

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
    textAlign: "center",
    marginRight: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.orange,
  },
  published: {
    textAlign: "center",
    marginRight: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.skyBlueDark,
  },
  notPublished: {
    textAlign: "center",
    marginRight: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.darkBlueShade,
  },
  pendingWeb: {
    textAlign: "center",
    paddingLeft: 8,
    borderRadius: 16,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: colors.lightOrange,
    color: colors.orange,
  },
  publishedWeb: {
    textAlign: "center",
    borderRadius: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.skyBlueDark,
    backgroundColor: colors.skyBlueLight,
  },
  notPublishedWeb: {
    borderRadius: 16,
    textAlign: "center",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.darkBlueShade,
    backgroundColor: colors.greyOne,
  },
  tableHeadingText: {
    fontWeight: "600",
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
  statusStyle:{
    alignItems:"flex-start"
  },
  iconTicketColoum:{
    alignItems:"center"
  }
});

export default styles;
