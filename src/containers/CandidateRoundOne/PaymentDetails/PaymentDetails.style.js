const getStyles = (theme) => {
  const { colors } = theme;

  return {
    mainContainer: {
      padding: 24,
      flex: 1,
      gap: 16,
      backgroundColor: colors.backgroundColor,
    },
    cardContainer: {
      backgroundColor: colors.white,
      borderColor: colors.lightGrey,
      borderWidth: 1,
      padding: 24,
      borderRadius: 16,
      gap: 24,
    },

    customTextStyle: { color: colors.black, fontSize: 16, fontWeight: "600" },

    buttonStyle: {
      maxWidth: 150,
    },
    customTableStyle: {
      backgroundColor: colors.white,
      padding: 0,
      marginBottom: 16,
      borderRadius: 16,
      overflow: "hidden",
      borderWidth: 0.5,
      borderColor: colors.lightGrey,
    },
    tableCard: { gap: 16 },
  };
};

export default getStyles;
