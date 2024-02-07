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
  titleContainerWeb: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    padding: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: colors.lightGrey,
  },
  formHeaderStyle: {
    color: colors.black,
    fontSize: 20,
    marginRight: 16,
  },
  formHeaderStyleWeb: {
    fontSize: 32,
    marginRight: 16,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
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
    fontSize: 14,
  },
};

export default style;
