const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      backgroundColor: colors.white,
    },
    headerContainerStyle: {
      padding: 16,
    },
    formHeaderStyle: {
      color: colors.black,
      fontSize: 20,
      fontWeight: "700",
    },
    borderStyle: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
    },
  };
};

export default getStyles;
