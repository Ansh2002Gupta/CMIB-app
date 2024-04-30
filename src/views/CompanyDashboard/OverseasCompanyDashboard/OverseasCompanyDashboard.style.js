const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flex: 1,
      backgroundColor: colors.backgroundGrey,
    },
    pieChartContiner: { gap: 24, flexDirection: "row", flexWrap: "wrap" },
    customHeaderText: {
      maxWidth: "80%",
    },
  };
};

export default getStyles;
