const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      justifyContent: "flex-start",
      backgroundColor: colors.white,
      marginBottom: 16,
      borderColor: colors.lightGrey,
      borderWidth: 1,
      borderRadius: 16,
      padding: 24,
    },
    donutChartContainer: {
      backgroundColor: colors.white,
      borderRadius: 16,
      padding: 24,
      borderWidth: 1,
      borderColor: colors.lightGrey,
    },

    headerText: {
      fontSize: 16,
      color: colors.black,
    },
    legendContainer: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
      width: "50%",
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 8,
    },
    legendText: {
      fontSize: 12,
      color: colors.black,
    },
    donutContainer: {
      marginStart: 90,
      marginTop: 20,
    },
  };
};

export default getStyles;
