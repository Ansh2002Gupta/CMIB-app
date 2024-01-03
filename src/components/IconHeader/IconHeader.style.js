import colors from "../../assets/colors";

const style = {
  container: {
    backgroundColor: colors.white,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  formHeaderStyle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "600",
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  webHeaderStyle: {
    fontSize: 32,
    fontWeight: "600",
  },
  cardContainer: {
    paddingTop: 14,
    paddingBottom: 14,
  },
  editContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight: "600",
    fontSize: 14,
  },
};

export default style;
