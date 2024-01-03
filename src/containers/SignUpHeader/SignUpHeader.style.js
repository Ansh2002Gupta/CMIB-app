import colors from "../../assets/colors";

const style = {
  headerContainerStyle: {
    marginTop: 24,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: "flex-end",
  },
  headerTextStyle: {
    color: colors.darkBlue,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  iconBar: {
    alignSelf: "center",
    margin: 16,
  },
  formHeaderStyle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
    marginBottom: 24,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  innerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
};

export default style;
