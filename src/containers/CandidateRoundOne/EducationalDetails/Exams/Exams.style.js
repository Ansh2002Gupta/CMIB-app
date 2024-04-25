const getStyles = (theme) => {
  const { colors } = theme;

  return {
    cardContainer: {
      backgroundColor: colors.white,
      marginBottom: 16,
    },
    customToggleStyle: {
      marginTop: 20,
      marginBottom: 24,
      marginRight: 24,
    },
    gap: {
      marginTop: 24,
    },
    gridView: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      marginTop: 24,
    },
    groupGridView: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      marginTop: 24,
    },
    groupTitleText: {
      fontSize: 14,
      color: colors.black,
    },
    mainContainer: {
      marginTop: 12,
    },
    textInputContainer: (isRightMargin) => ({
      marginRight: isRightMargin ? 16 : 0,
      marginBottom: 24,
    }),
    titleText: {
      fontSize: 16,
      color: colors.black,
    },
  };
};

export default getStyles;
