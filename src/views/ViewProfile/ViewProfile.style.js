import { Dimensions, Platform } from "@unthinkable/react-core-components";

const deviceHeight = Dimensions.get("window").height;

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    profileContainer: {
      marginTop: 16,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    picContainer: {
      alignItems: "center",
      marginTop: 16,
    },
    picParentContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    cardStyle: {
      marginTop: 24,
    },
    modalProfileImage: {
      width: 152,
      height: 152,
      borderRadius: 76,
    },
    modalOverlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "transparent",
    },
    deletetextContainer: {
      backgroundColor: colors.white,
      position: "absolute",
      right: 0,
      top:
        Platform.OS.toLowerCase() === "ios"
          ? deviceHeight / 7.25
          : deviceHeight / 11.5,
      zIndex: 10,
      padding: 16,
      width: 240,
      height: 54,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 8,
    },
    deletetext: {
      fontSize: 14,
    },
    iconStyle: {
      backgroundColor: colors.secondaryGrey,
      padding: 4,
    },
    buttonTwoStyle: {
      backgroundColor: colors.red,
    },
    buttonTwotextStyle: {
      color: colors.white,
    },
    inActiveIconStyle: {
      padding: 4,
    },
    customContainerStyle: {
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 24,
    },
    customTextStyle: {
      fontSize: 18,
    },
  };
};

export default getStyles;
