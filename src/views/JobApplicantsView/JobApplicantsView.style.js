import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import { baseChipStyle } from "../../theme/styles/commonStyles";

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
  sortingIcon: {
    height: 16,
    width: 16,
    marginLeft: 2,
  },
  inactive: {
    ...baseChipStyle,
    color: colors.black,
  },
  active: {
    ...baseChipStyle,
    color: colors.darkGreen,
  },
  inactiveWeb: {
    ...baseChipStyle,
    color: colors.black,
    backgroundColor: colors.greyOne,
  },
  activeWeb: {
    ...baseChipStyle,
    color: colors.darkGreen,
    backgroundColor: colors.lightGreen2,
  },
  inactiveActiveStyle: {
    alignItems: "flex-start",
  },
  underLineText: {
    fontWeight: 600,
    color: colors.darkBlue,
    textDecorationLine: "underline",
  },
  popupMessageStyle: {
    position: "absolute",
    top: 0,
    right: 15,
    height: "auto",
    width: "auto",
    minWidth: 233,
  },
  mobTextStyle: {},
  customMessageSTyle: {
    fontSize: 14,
    paddingTop: 16,
    paddingBottom: 16,
  },
  mobileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderColor: colors.greyOne,
    backgroundColor: colors.white,
    zIndex: 0,
    position: "relative",
  },
  tableQueryText: {
    marginTop: 2,
    color: colors.darkGrey,
    zIndex: 0,
  },
  rowsPerPageWeb: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconTicket: {
    height: 20,
    width: 20,
  },
  designationViewStyle: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default styles;
