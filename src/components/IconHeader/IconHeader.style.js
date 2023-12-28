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
  iconBar: {
    alignSelf: "center",
    margin: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    margin: 8,
  },
  formHeaderStyle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  webHeaderStyle: {
    fontSize: 32,
    fontWeight: "600",
  },
};

export default style;
