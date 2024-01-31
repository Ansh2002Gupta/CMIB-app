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
  row:{
    flexDirection: "row",
  },
  searchParent: {
    backgroundColor: colors.offWhite,
    borderColor: colors.black,
    flex: 1,
    marginRight: 16,
    marginTop: 16,
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
  backBtnStyles: {
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 8,
    paddingLeft: 13,
    paddingRight: 6,
    paddingTop: 12,
    paddingBottom: 12,
    color: colors.white,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 0,
  },
});

export default styles;
