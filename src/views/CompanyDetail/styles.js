const getStyles = (theme) => {
  const { colors } = theme;

  return {
    containerStyle: {
      flex: 1,
      overflow: "hidden",
      backgroundColor: colors.white,
    },
    containeStyleMob: {
      flex: 1,
      overflow: "hidden",
      backgroundColor: colors.white,
      paddingTop: 16,
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
