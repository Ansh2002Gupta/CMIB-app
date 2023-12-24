import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  selectedImageContainer: {
    borderStyle: "solid",
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    borderBottom: `1px solid ${colors.lightGrey}`,
    alignItems: "center",
  },
  selectedImageStyle: {
    maxWidth: 450,
    maxHeight: 200,
    objectFit: "contain",
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
