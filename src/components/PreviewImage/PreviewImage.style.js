import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  selectedImageContainer: {
    borderStyle: "solid",
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 240,
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
  noPadding: {
    padding: 0,
  },
  selectedImageStyle: {
    minHeight: 145,
    minWidth: 150,
    maxHeight: 200,
    resizeMode: "contain",
    ...Platform.select({
      web: {
        maxWidth: "100%",
      },
    }),
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
  deleteIcon: {
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
});

export default styles;
