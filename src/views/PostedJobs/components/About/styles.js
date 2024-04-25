const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      backgroundColor: colors.white,
      borderWidth: 1,
    },
    headingTextStyle: {
      color: colors.black,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
    },
  };
};

export default getStyles;
