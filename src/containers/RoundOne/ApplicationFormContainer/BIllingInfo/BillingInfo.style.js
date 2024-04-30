const getStyles = (theme) => {
  const { colors } = theme;

  return {
    mainContainer: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.backgroundColor,
    },
    customTableContainerStyle: {
      paddingBottom: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingLeft: 0,
      backgroundColor: colors.white,
    },
    customTableStyle: {
      backgroundColor: colors.white,
      marginBottom: 16,
      borderRadius: 16,
      borderWidth: 0.5,
      borderColor: colors.lightGrey,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: 24,
    },
    headerText: {
      fontSize: 16,
    },
    actionBtnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 16,
      paddingTop: 24,
      backgroundColor: colors.backgroundColor,
    },
    buttonStyle: { maxHeight: 44, maxWidth: 80 },
    buttonTwoStyle: { maxHeight: 44, maxWidth: 150 },
    backButtonStyle: {
      fontSize: 14,
    },
    interviewDatesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    columnStyleBorder: {
      backgroundColor: colors.white,
      borderColor: colors.lightGrey,
      borderTopWidth: 0.5,
    },
    nextButtonStyle: { fontSize: 14, color: colors.white },
    customTableStyleMob: {
      backgroundColor: colors.white,
      borderWidth: 0,
      overflow: "hidden",
      borderRadius: 16,
      marginBottom: 16,
      padding: 0,
      borderColor: colors.lightGrey,
    },
    mobileContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderColor: colors.greyOne,
      backgroundColor: colors.white,
      zIndex: 0,
      position: "relative",
    },
    tableQueryText: {
      marginTop: 2,
      color: colors.darkGrey,
      marginRight: 5,
      zIndex: 0,
    },
    borderBottom: {
      borderColor: colors.lightGrey,
      borderTopWidth: 0.5,
    },
    rowsPerPageWeb: {
      flexDirection: "row",
      alignItems: "center",
    },
    subHeadingSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    valuesStyle: {
      color: colors.darkGrey,
    },
    bottomText: {
      fontSize: 14,
    },
    bottomContainer: {
      paddingTop: 16,
      paddingBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  };
};

export default getStyles;
