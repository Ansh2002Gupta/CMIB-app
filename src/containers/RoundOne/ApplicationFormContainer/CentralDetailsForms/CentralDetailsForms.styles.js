import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
    },
    containerGridStyle: (columnCount) => ({
      display: "grid",
      gridTemplateColumns: columnCount || "1fr 1fr 1fr",
      paddingBottom: 8,
    }),
    cardStyle: {
      marginLeft: 16,
      marginRight: 16,
    },
    companyLogo: {
      marginTop: 24,
      marginBottom: 24,
      height: 184,
      width: 347,
    },
    imageContainer: {
      marginBottom: 24,
      ...Platform.select({
        web: {
          maxWidth: 374,
        },
      }),
    },
    infoStyle: {
      marginBottom: 24,
      color: colors.darkGrey,
      fontSize: 14,
      lineHeight: 24,
    },
    textContainer: {
      flexDirection: "row",
      paddingBottom: 24,
      alignItems: "center",
    },
    headingText: {
      fontSize: 16,
      color: colors.darkGrey,
    },
    actionBtnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 16,
      padding: 24,
      backgroundColor: colors.backgroundColor,
    },
    valueStyle: {
      marginLeft: 4,
      fontSize: 16,
      color: colors.black,
    },
    buttonStyle: { maxHeight: 44, maxWidth: 80 },
    loading: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    rightSection: {
      flexDirection: "row",
      gap: 8,
    },
    disabled: {
      opacity: 0.5,
      backgroundColor: colors.white,
      cursor: Platform.OS.toLowerCase() === "web" ? "not-allowed" : "",
    },

    innerContainerStyle: {
      flex: 1,
      marginBottom: 16,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 24,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      paddingLeft: 24,
      paddingRight: 24,
      backgroundColor: colors.white,
    },

    customCardStyle: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingRight: 0,
      paddingLeft: 0,
      borderWidth: 0,
      borderRadius: 0,
      backgroundColor: "transparent",
    },
    customContainerStyle: {
      overflow: "visible",
      flexDirection: "column",
    },
    topContainer: {
      flexDirection: "row",
    },
    configurableStyle: {
      paddingHorizontal: undefined,
      paddingVertical: undefined,
      backgroundColor: undefined,
      marginTop: 24,
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 16,
    },
    componentContainer: {
      borderWidth: 1,
      margin: 0,
      alignItems: "stretch",
      flex: 1,
      backgroundColor: colors.white,
      minWidth: 300,
    },
    flexContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    messageText: {
      fontSize: 14,
      lineHeight: 16,
      color: colors.black,
      fontWeight: "600",
    },
    headerTextStyle: {
      fontSize: 16,
    },
    customToggleStyle: { marginTop: 12 },
    customLabelStyle: { color: colors.gray },
    toggleComponent: { marginBottom: 24 },
    checkBoxStyle: {
      marginTop: 8,
    },
    viewCheckBoxStyle: {
      marginTop: 8,
      flex: 1,
      flexDirection: "row",
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
    },
    selectionProcessStyle: {
      color: colors.black,
      fontSize: 16,
      paddingBottom: 12,
    },
    bottomMargin: {
      marginBottom: 24,
    },
    roundDetailContainer: {},
    roundHeaderText: {
      color: colors.black,
      fontSize: 20,
      lineHeight: 27,
      fontWeight: "600",
      marginTop: 24,
    },
    buttonTwoStyle: { maxHeight: 44, maxWidth: 150 },
    buttonTwoStyleContainer: {
      flex: undefined,
    },
    backButtonStyle: {
      fontSize: 14,
    },
    nextButtonStyle: { fontSize: 14, color: colors.white },
    starStyle: { color: colors.errorRed },
    selectionProcessTitle: {
      flexDirection: "row",
    },
    loader: {
      color: colors.green,
    },
    mobileTopContainer: {
      flexDirection: "column",
    },
    chipStyle: {
      backgroundColor: colors.secondaryGrey,
    },
    chipCustomStyle: {
      paddingTop: 14,
    },
  };
};

export default getStyles;
