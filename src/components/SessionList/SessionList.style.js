import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  listItem: (isSelected) => ({
    backgroundColor: isSelected ? colors.offWhite : "transparent",
    borderColor: colors.white,
    borderLeftWidth: isSelected ? 3 : 0,
    justifyContent: "flex-start",
    paddingBottom: 18,
    paddingLeft: isSelected ? 13 : 16,
    paddingRight: isSelected ? 13 : 16,
    paddingTop: 18,
    width: "100%",
  }),
  noResultContainer: {
    marginHorizontal: 16,
    marginVertical: 18,
  },
  searchParent: {
    backgroundColor: colors.offWhite,
    borderColor: colors.black,
    margin: 16,
  },
  searchInput: {
    backgroundColor: "transparent",
    color: colors.lightGrey,
  },
  text: (isSelected) => ({
    color: isSelected ? colors.white : colors.lightGrey,
    fontSize: 14,
    ...Platform.select({
      web: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    }),
  }),
});

export default styles;
