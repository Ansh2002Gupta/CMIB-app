const getStyles = (theme) => {
  const { colors } = theme;

  return {
    buttonContainer: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      backgroundColor: colors.white,
      flexDirection: "row",
      padding: 14,
      justifyContent: "center",
      alignItems: "center",
    },
  };
};

export default getStyles;
