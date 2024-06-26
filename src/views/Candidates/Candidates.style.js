const getStyles = (theme) => {
  const { colors } = theme;

  return {
    containerStyle: {
      flex: 1,
      overflow: "hidden",
    },
    headerContainer: {
      paddingBottom: 16,
      justifyContent: "space-between",
    },
    titleText: {
      fontSize: 20,
      lineHeight: 40,
      color: colors.black,
    },
  };
};

export default getStyles;
