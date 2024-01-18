import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
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
  changeText: {
    color: colors.white,
    fontSize: 14,
  },
  disabled: {
    color: colors.slateGray,
  },
  moduleListWithoutCursor: {
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: "flex-start",
  },
});

export default styles;
