import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";
import { baseChipStyle } from "../../theme/styles/commonStyles";
const styles = {
  customStyle: { maxWidth: 300, marginTop: 24 },
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
  cursorStyle: { cursor: "pointer" },
  justifyContentCenter: {
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 4,
  },
  checkBoxStyle: {
    justifyContent: "center",
    marginLeft: 0,
    paddingRight: 4,
    paddingTop: 0,
    paddingBottom: 0,
    alignItems: "center",
  },
  pending: {
    ...baseChipStyle,
    color: colors.darkGrey,
    fontSize: 14,
  },
  close: {
    ...baseChipStyle,
    color: colors.darkGreen,
    fontSize: 14,
  },

  pendingWeb: {
    ...baseChipStyle,
    color: colors.black,
    backgroundColor: colors.greyOne,
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
    height: 40,
    width: 40,
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
  iconTicket: {
    height: 20,
    width: 20,
  },
  customTableStyle: {
    backgroundColor: colors.white,
    paddingBottom: 4,
  },
  underLineStyle: {
    width: "20%",
    color: colors.darkBlue,
    borderBottomWidth: 1,
    borderColor: colors.darkBlue,
  },
};

export default styles;
