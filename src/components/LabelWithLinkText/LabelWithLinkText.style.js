const getStyles = (theme) => {
  const { colors } = theme;

  return {
    textContainer: {
      flexDirection: "row",
      alignSelf: "center",
      gap: 4,
    },
    labelTextStyle: {
      fontSize: 14,
      color: colors.mediumGray,
    },
    linkTextStyle: {
      color: colors.darkBlue,
      fontSize: 14,
      alignSelf: "center",
      cursor: "pointer",
    },
  };
};

export default getStyles;
