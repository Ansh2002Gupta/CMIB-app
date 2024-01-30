import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  disabled: {
    color: colors.slateGray,
  },
  leftArrow: {
    height: 15,
    width: 15,
  },
  leftArrowContainer: {
    backgroundColor: colors.offWhite,
    borderRadius: 12,
    cursor: "pointer",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 8,
  },
  moduleListItem: (isSelected) => ({
    paddingLeft: isSelected ? 13 : 16,
    paddingRight: isSelected ? 13 : 16,
    paddingTop: 18,
    paddingBottom: 18,
    width: "100%",
    cursor: "pointer",
    justifyContent: "flex-start",
    borderLeftWidth: isSelected ? 3 : 0,
    borderColor: colors.white,
    backgroundColor: isSelected ? colors.offWhite : "transparent",
  }),
  moduleListWithoutCursor: {
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    cursor: "default",
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: "flex-start",
  },
  text: {
    color: colors.white,
    fontSize: 14,
    ...Platform.select({
      web: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    }),
  },
});

export default styles;
