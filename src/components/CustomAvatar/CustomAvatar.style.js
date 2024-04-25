const getStyles = (theme) => {
  const { colors } = theme;

  return {
    initialsContainer: {
      justifyContent: "center",
      backgroundColor: colors.secondaryGrey,
      borderRadius: 20,
      alignItems: "center",
      height: 40,
      width: 40,
      marginRight: 8,
    },
    initialsText: {
      fontSize: 14,
    },
  };
};

export default getStyles;
