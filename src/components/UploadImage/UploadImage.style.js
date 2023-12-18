import colors from "../../assets/colors";

const style = {
  contentContainerStyle: {
    height: 240,
    borderWidth: 1,
    marginBottom: 48,
    borderRadius: 8,
    borderColor: colors.darkGrey,
    borderStyle: "dashed",
    justifyContent: "center",
    backgroundColor: colors.secondaryGrey,
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    borderBottom: `1px solid ${colors.lightGrey}`,
  },
  selectedImageStyle: {
    height: 120,
    width: 120,
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
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    // position: "absolute",
    // justifyContent: "flex-end",
    // bottom: 0,
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
  hideRawInputField: {
    display: "none",
  },
};

export default style;
