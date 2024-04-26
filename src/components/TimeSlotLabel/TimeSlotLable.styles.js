const getStyles = (theme) => {
  const { colors } = theme;

  return {
    outerContainer: {
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 16,
      paddingBottom: 16,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      marginBottom: 16,
      width: "48%",
    },
    selectedOuterContainer: {
      backgroundColor: colors.lightGreen,
      borderColor: colors.greenOne,
    },
    dateAndModePortion: {
      marginLeft: 8,
    },
    dateStyling: {
      fontSize: 14,
    },
    dateContainer: {
      marginBottom: 4,
    },
    modeStyling: {
      fontSize: 12,
      color: colors.darkGrey,
    },
    fixedWidthHeight: { height: 24, width: 24 },
  };
};

export default getStyles;
