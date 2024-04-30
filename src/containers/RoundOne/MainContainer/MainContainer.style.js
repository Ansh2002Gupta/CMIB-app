import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    main: {
      padding: 20,
    },
    header: {
      fontSize: 24,
      marginBottom: 24,
      textAlign: "center",
    },
    componentView: {
      padding: 24,
      backgroundColor: colors.white,
      flexDirection: "row",
    },
    componentStyle: {
      marginTop: 24,
      flexDirection: "row",
      paddingBottom: 24,
      ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
    },
    webComponentStyle: {
      flexDirection: "column",
      flex: 1,
      width: "100%",
    },
    webContainerStyle: {
      flexDirection: "row",
      gap: 24,
      width: "100%",
      backgroundColor: colors.backgroundColor,
      paddingLeft: 16,
      paddingRight: 16,
    },
    mobContainer: {
      flex: 1,
    },
    containerStyle: {
      backgroundColor: colors.backgroundColor,
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 16,
    },
    addApplicationView: {
      flex: 1,
      paddingLeft: 16,
      paddingRight: 16,
    },
    addApplicationFormText: {
      fontSize: 18,
      color: colors.black,
    },
    addApplicationFormDescriptionText: {
      fontSize: 14,
      color: colors.subHeadingGray,
      marginTop: 8,
    },
    webAddApplicationView: {
      paddingLeft: 0,
      paddingTop: 16,
    },
    innerContainer: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    buttonStyle: {
      flex: 1,
    },
    imageStyle: {
      maxWidth: 40,
    },
  };
};

export default getStyles;
