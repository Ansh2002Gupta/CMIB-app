import colors from "../../assets/colors";

const style = {
  container: {
    backgroundColor: colors.white,
  },
  headerContainerStyle: {
    margin: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTextStyle: {
    textAlign: "right",
    color: colors.darkBlue,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    fontFamily: "GeneralSans-Semibold",
  },
  iconBar: {
    alignSelf: "center",
    margin: 16,
  },
  formHeaderStyle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    fontFamily: "GeneralSans-Bold",
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
};

export default style;
