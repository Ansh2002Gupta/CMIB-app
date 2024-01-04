// TODO:I have break down the UploadImage component into smaller components and have added the required styles in those components. But I haven't removed them from here because UploadImage.native file is still using it. Once it start using those components we need to remove the duplicated styles from this file.

import colors from "../../assets/colors";

const styles = {
  containerStyle: {
    marginBottom: 24,
  },
  contentContainerStyle: {
    height: 240,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.darkGrey,
    borderStyle: "dashed",
    justifyContent: "center",
    backgroundColor: colors.secondaryGrey,
    alignItems: "center",
  },
  showImageStyle: {
    borderStyle: "solid",
    borderColor: colors.lightGrey,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: colors.lightGrey,
    alignItems: "center",
  },
  selectedImageStyle: {
    maxWidth: 450,
    maxHeight: 200,
    objectFit: "contain",
  },
  selectedImageContainer: {
    borderStyle: "solid",
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.darkBlack,
  },
  nameStyle: {
    color: colors.darkBlue,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  browseStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.green,
    textDecorationLine: "underline",
  },
  infoStyle: {
    color: colors.darkGrey,
    lineHeight: 18,
  },
};

export default styles;
