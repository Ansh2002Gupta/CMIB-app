const getStyles = (theme) => {
  const { colors } = theme;

  return {
    contentContainerStyle: {
      flex: 1,
    },

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
    checkBoxItem: {
      marginBottom: 0,
    },
  };
};

export default getStyles;
