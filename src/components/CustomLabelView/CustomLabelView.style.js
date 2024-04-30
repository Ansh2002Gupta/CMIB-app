const getStyles = (theme) => {
  const { colors } = theme;

  return {
    labelContainer: {
      flexDirection: "row",
      marginBottom: 4,
      gap: 4,
    },
    label: {
      color: colors.darkGrey,
    },
    labelStar: {
      marginLeft: 4,
    },
    webLabel: {
      color: colors.black,
    },
    starStyle: { color: colors.errorRed },
  };
};

export default getStyles;
