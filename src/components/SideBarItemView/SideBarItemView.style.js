import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  changeText: {
    color: colors.white,
    fontSize: 12,
  },
  changeTextContainer: {
    backgroundColor: colors.offWhite,
    borderRadius: 12,
    cursor: "pointer",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 8,
  },
  contentText: {
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
  contentTextContainer: {
    alignItems: "center",
    backgroundColor: colors.offWhite,
    borderBottomColor: colors.slateGray,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  leftSection: {
    ...Platform.select({
      web: {
        maxWidth: "70%",
        flex: 1,
      },
      default: {
        flex: 1,
      },
    }),
  },
  mainContainer: {
    marginTop: 8,
  },
  titleText: {
    color: colors.darkGrey,
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
});

export default styles;
