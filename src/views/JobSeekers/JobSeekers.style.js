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
  badgeContainerStyle: {
    paddingBottom: 0,
  },
  labelStyle: {
    fontSize: 12,
  },
  tableHeadingText: {
    fontWeight: "600",
    color: colors.darkGrey,
  },
  iconMore: {
    height: 20,
    width: 20,
  },
  iconTicketColoum: {
    alignItems: "center",
  },
  sortingIcon: {
    height: 16,
    width: 16,
  },
  tableContent: {
    height: "90%",
  },
  cursorStyle: { cursor: "pointer" },
});

export default styles;
