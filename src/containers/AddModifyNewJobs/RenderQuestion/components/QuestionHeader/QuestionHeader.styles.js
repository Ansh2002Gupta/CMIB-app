const getStylesForMobile = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flexDirection: "row",
      marginTop: 16,
    },
    headerTextStyle: {
      fontSize: 14,
      fontFamily: "General Sans",
      fontWeight: "bold",
    },
    marginLeft4: {
      marginLeft: 4,
    },
    questionViewStyle: {
      marginTop: 16,
      marginBottom: 16,
    },
    questionTextStyle: {
      fontSize: 14,
      fontFamily: "General Sans",
    },
  };
};

export default getStylesForMobile;
