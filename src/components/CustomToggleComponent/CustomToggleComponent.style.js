import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    mainView: {
      flexDirection: "row",
      alignItems: "center",
    },
    yesButtonStyle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.lightGray,
      justifyContent: "center",
      alignItems: "center",
      ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
    },
    noButtonStyle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.lightGray,
      justifyContent: "center",
      alignItems: "center",
      ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
    },
    activeButtonStyle: {
      borderColor: colors.green,
    },
    buttonViewStyle: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: "transparent",
    },
    activeButtonViewStyle: {
      backgroundColor: colors.green,
    },
    textStyle: {
      fontSize: 12,
      color: colors.black,
      paddingLeft: 8,
      paddingRight: 16,
    },
    container: {
      paddingBottom: 32,
    },
    labelContainer: {
      flexDirection: "row",
      gap: 4,
    },
    label: {
      color: colors.darkGrey,
    },
    webLabel: {
      color: colors.black,
    },
    starStyle: { color: colors.errorRed },
    errorMsg: {
      ...Platform.select({
        web: {
          wordBreak: "break-word",
        },
      }),
      color: colors.errorRed,
      lineHeight: 18,
      marginTop: -20,
      marginBottom: 10,
    },
  };
};

export default getStyles;
