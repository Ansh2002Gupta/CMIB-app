import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
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
});

export default styles;
