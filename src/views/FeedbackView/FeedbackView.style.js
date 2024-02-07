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
        maxWidth: "120px",
      },
    }),
  }),
  pending: {
    color: colors.orange,
  },
  published: {
    ...baseChipStyle,
    color: colors.skyBlueDark,
  },
  notPublished: {
    ...baseChipStyle,
    color: colors.darkBlueShade,
  },
  pendingWeb: {
    ...baseChipStyle,
    backgroundColor: colors.lightOrange,
    color: colors.orange,
  },
  publishedWeb: {
    ...baseChipStyle,
    color: colors.skyBlueDark,
    backgroundColor: colors.skyBlueLight,
  },
  notPublishedWeb: {
    ...baseChipStyle,
    color: colors.darkBlueShade,
    backgroundColor: colors.greyOne,
  },
  tableHeadingText: {
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
});

export default styles;
