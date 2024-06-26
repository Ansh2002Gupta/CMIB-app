import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    mainContainer: { flex: 1 },
    componentStyle: {
      marginTop: 16,
      flexDirection: "row",
      padding: 24,
      width: "100%",
      ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
    },
    containerStyle: {
      backgroundColor: colors.backgroundColor,
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 16,
    },
    descriptionText: {
      fontSize: 14,
      color: colors.subHeadingGray,
      marginTop: 8,
    },
    headerContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      borderBottomColor: colors.lightGrey,
      borderBottomWidth: 1,
      backgroundColor: colors.white,
    },
    headerText: (isWebView) => ({
      fontSize: isWebView ? 32 : 20,
      color: colors.black,
    }),
    imageStyle: {
      height: 24,
      width: 24,
    },
    imageContainer: {
      height: 40,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: colors.secondaryGrey,
      marginRight: 16,
    },
    mainStyle: {
      flex: 1,
    },
    mobContainer: {
      flex: 1,
    },
    secondRowContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
    },
    textView: {
      flexShrink: 1,
    },
    titleText: {
      fontSize: 20,
      color: colors.black,
    },
    webComponentStyle: {
      flexDirection: "column",
      flex: 1,
      width: "100%",
      height: 236,
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 24,
      paddingRight: 24,
      justifyContent: "flex-end",
    },
    webComponentSecondRowStyle: {
      flexDirection: "column",
      flex: 1,
      maxWidth: 370,
      height: 236,
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 24,
      paddingRight: 24,
      justifyContent: "flex-end",
    },
    webContainerStyle: {
      flexDirection: "row",
      gap: 24,
      backgroundColor: colors.backgroundColor,
      paddingLeft: 24,
      paddingRight: 24,
      marginTop: 8,
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    webContainerSecondRowStyle: {
      flexDirection: "row",
      gap: 24,
      backgroundColor: colors.backgroundColor,
      paddingLeft: 24,
      paddingRight: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    webHeaderContainer: {
      padding: 24,
      borderBottomColor: colors.lightGrey,
      borderTopColor: colors.lightGrey,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      backgroundColor: colors.white,
    },
    webTextView: {
      paddingTop: 16,
    },
  };
};

export default getStyles;
