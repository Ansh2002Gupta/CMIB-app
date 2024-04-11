import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";
import { baseChipStyle } from "../../theme/styles/commonStyles";

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
  sortingIcon: {
    height: 16,
    width: 16,
  },
  inProgress: {
    ...baseChipStyle,
    color: colors.skyBlueDark,
  },
  pending: {
    ...baseChipStyle,
    color: colors.orange,
  },
  active: {
    ...baseChipStyle,
    color: colors.darkSecondGreen,
  },
  close: {
    ...baseChipStyle,
    color: colors.darkGreen,
  },
  inProgressWeb: {
    ...baseChipStyle,
    backgroundColor: colors.skyBlueLight,
    color: colors.skyBlueDark,
  },
  pendingWeb: {
    ...baseChipStyle,
    color: colors.orange,
    backgroundColor: colors.lightOrange,
  },
  activeWeb: {
    ...baseChipStyle,
    backgroundColor: colors.lightGreen2,
    color: colors.darkSecondGreen,
  },
  closeWeb: {
    ...baseChipStyle,
    color: colors.darkGreen,
    backgroundColor: colors.lightGreen,
  },
  tableHeadingText: {
    fontWeight: "600",
    color: colors.darkGrey,
  },
  iconMoreColumn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 1,
    marginBottom: 1,
  },
  statusStyle: {
    alignItems: "flex-start",
  },
  iconTicketColoum: {
    alignItems: "center",
  },
  sortingIcon: {
    height: 16,
    width: 16,
  },
  container: {
    ...Platform.select({
      web: {
        height: "90vh",
      },
    }),
  },
  tableContent: {
    height: "90%",
  },
  addNewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  addNewText: {
    color: colors.white,
  },
  popUpMessagePosition: {
    position: "absolute",
    top: 20,
    right: 10,
  },
});

export default styles;
