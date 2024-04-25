const getStyles = (theme) => {
  const { colors } = theme;

  return {
    cardStyle: {
      marginLeft: 16,
      marginRight: 16,
      marginTop: 24,
    },
    customStyle: { display: "flex" },
    footerContainer: {
      marginBottom: 12,
      color: colors.darkGrey,
      fontSize: 12,
      fontStyle: "italic",
      fontWeight: 500,
    },
  };
};

export default getStyles;
