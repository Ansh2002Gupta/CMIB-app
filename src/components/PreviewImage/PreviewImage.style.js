import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  selectedImageContainer: {
    borderStyle: "solid",
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  showImageStyle: {
    borderStyle: "solid",
    borderColor: colors.lightGrey,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: colors.lightGrey,
    alignItems: "center",
    minWidth: 250,
    minHeight: 150,
    padding: 10,
  },
  selectedImageStyle: {
    minHeight: 145,
    minWidth: 150,
    maxWidth: 450,
    maxHeight: 200,
    objectFit: "contain",
    width: "100%",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.white,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  textContainerBox: {
    ...Platform.select({
      web: {
        flexShrink: "unset",
      },
    }),
  },
  nameStyle: {
    color: colors.darkBlue,
    fontSize: 14,
    lineHeight: 24,
  },
  deleteIcon: {
    cursor: Platform.OS.toLowerCase() === "web" ? "pointer" : "",
  },
});

export default styles;
