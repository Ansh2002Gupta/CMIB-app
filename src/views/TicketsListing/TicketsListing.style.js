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
  inProgress: {
    ...baseChipStyle,
    color: colors.skyBlueDark,
  },
  pending: {
    ...baseChipStyle,
    color: colors.orange,
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
  closeWeb: {
    ...baseChipStyle,
    color: colors.darkGreen,
    backgroundColor: colors.lightGreen,
  },
  tableHeadingText: {
    fontWeight: "600",
    color: colors.darkGrey,
  },
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
});

export default styles;
