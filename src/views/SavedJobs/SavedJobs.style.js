const getStyles = (theme) => {
  const { colors } = theme;

  return {
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 16,
    },
    customParentStyle: { width: "40%" },
    innerContainer: {
      backgroundColor: colors.backgroundGrey,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
    },
    bottomSectionStyle: {
      flex: 1,
    },
    loaderStyle: { justifyContent: "center", alignItems: "center", flex: 1 },
    scrollstyle: {
      flex: 1,
    },
    noResultContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    noResultText: {
      fontSize: 18,
    },
    customToastStyle: {
      top: 50,
      bottom: "50%",
    },
  };
};

export default getStyles;
