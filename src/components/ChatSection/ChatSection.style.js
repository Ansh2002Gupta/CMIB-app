import { Dimensions } from "@unthinkable/react-core-components";

const { height: HEIGHT } = Dimensions.get("window");

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    chatSection: {
      flex: 1,
      zIndex: 1,
    },
    messageSection: {
      maxheight: 722,
      height: HEIGHT * 0.5,
      overflowY: "auto",
      paddingLeft: 16,
      paddingRight: 16,
    },
    inputSection: {
      paddingTop: 24,
    },
    cutomTextInput: {
      paddingBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
    },
    loadingStyle: {
      padding: 12,
      marginTop: 50,
      alignItems: "center",
    },
    customTextInputOuterContainer: {
      borderRadius: 12,
      paddingRight: 0,
    },
    messageFlag: {
      fontSize: 14,
      color: colors.black,
      marginLeft: 16,
      marginRight: 16,
    },
    flagContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 20,
      width: "100%",
    },
    horizontalLine: {
      width: "40%",
      height: 1,
      backgroundColor: colors.lightGrey,
    },
  };
};

export default getStyles;
