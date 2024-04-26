const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      backgroundColor: colors.blackWithMinorOpacity,
      height: "100%",
      width: "100%",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    playIconBoxStyles: {},
    playIconStyles: {
      width: 50,
      height: 50,
    },
  };
};

export default getStyles;
