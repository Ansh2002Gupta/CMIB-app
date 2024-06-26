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
    mainContainer: {
      padding: 24,
    },
    passportNo: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
    },
    textInputContainer: (isRightMargin) => ({
      marginRight: isRightMargin ? 16 : 0,
      marginBottom: 24,
    }),
    titleText: {
      fontSize: 16,
      color: colors.black,
    },
    checkBoxTextStyle: {
      minWidth: 400,
    }
  }
};

export default getStyles;
