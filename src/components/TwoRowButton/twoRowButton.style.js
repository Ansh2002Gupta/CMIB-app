import colors from "../../assets/colors";

const style = {
  containerStyle: {
    // Add styles for the container here
    marginTop: 24,
  },
  disableButtonStyle: {
    // Add styles for the first button here
    height: 56,
    backgroundColor: colors.white,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    flex: 1,
  },
  disableTextStyle: {
    // Add text styles for the first button here
    fontSize: 16,
    color: colors.black,
    margin: 8,
  },
  buttonStyle: {
    // Add styles for the second button here
    height: 56,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    flex: 1,
  },
  secondButtonStyle: {
    // Add additional styles for the second button here
    marginLeft: 8,
    backgroundColor: colors.yellow,
  },
  titleStyle: {
    // Add text styles for the second button here
    fontSize: 14,
    color: colors.black,
  },
  
};

export default style;
