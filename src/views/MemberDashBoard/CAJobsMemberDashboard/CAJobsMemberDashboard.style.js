const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flex: 1,
      backgroundColor: colors.backgroundGrey,
    },
    pieChartContiner: { gap: 24, flexDirection: "row", flexWrap: "wrap" },
    webGraphContainer: {
      flex: 1,
    },
    mobileGraphContainer: {
      width: "100%",
    },
  };
};

export default getStyles;
