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
    backgroundColor: colors.lightGreen,
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
    top: 20,
    right: 10,
    height: "auto",
    width: "auto",
    minWidth: 233,
  },
  customMessageSTyle: {
    lineHeight: 24,
  },
});

export default styles;
