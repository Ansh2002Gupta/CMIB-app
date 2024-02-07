import colors from "../../assets/colors";

const style = {
  initialsContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 200,
    alignItems: "center",
    height: 104,
    width: 104,
  },
  outerContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 65,
    alignItems: "center",
    padding: 6.5,
  },
  editOuterContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    padding: 3,
    position: "absolute",
    bottom: 6.5,
    right: 6.5,
  },
  editInnerContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    height: 24,
    width: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  containerStyle: {
    backgroundColor: colors.black,
  },
  profileImageStyle: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  initialsText: {
    fontSize: 36,
    color: colors.white,
  },
  iconStyle: {
    height: 14,
    width: 14,
  },
};

export default style;
