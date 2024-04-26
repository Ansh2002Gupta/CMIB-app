const getStyles = (theme) => {
  const { colors } = theme;

  return {
    contentContainerStyle: {},

    innerContainerStyle: {
      marginBottom: 16,
    },

    loaderStyle: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundColor,
    },
  };
};

export default getStyles;
