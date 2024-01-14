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
        maxWidth: "100%",
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
    color: colors.orange,
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
    backgroundColor: colors.skyBlueLight,
    color: colors.skyBlueDark,
  },
  pendingWeb: {
    textAlign: "center",
    borderRadius: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    color: colors.orange,
    backgroundColor: colors.lightOrange,
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
  }
});

export default styles;
