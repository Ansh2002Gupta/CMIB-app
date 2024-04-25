const getStyles = (theme) => {
  const { colors } = theme;

  return {
    customCardStyle: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingRight: 0,
      paddingLeft: 0,
      borderWidth: 0,
      borderRadius: 0,
      backgroundColor: "transparent",
    },
    detailCard: {
      marginBottom: 24,
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
