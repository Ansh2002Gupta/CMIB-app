import colors from "../../assets/colors";

const style = {
  container: {
    backgroundColor: colors.white,
    zIndex: 0,
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
    zIndex: 0,
    height: 92,
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
    height: 44,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 16,
    paddingLeft: 16,
    zIndex: 0,
    cursor: "pointer",
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
  iconStyle: {
    height: 20,
    width: 20,
  },
};

export default style;
