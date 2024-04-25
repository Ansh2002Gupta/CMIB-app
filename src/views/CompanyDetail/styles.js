const getStyles = (theme) => {
  const { colors } = theme;

  return {
    containerStyle: {
      flex: 1,
      overflow: "hidden",
      backgroundColor: colors.white,
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
