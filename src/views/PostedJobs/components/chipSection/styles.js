const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      backgroundColor: colors.white,
    },
    chipContainer: {
      alignItems: "flex-start",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    chipView: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 18,
      marginRight: 12,
      marginTop: 12,
      alignSelf: "flex-start",
    },
    chip: {
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 6,
      paddingBottom: 6,
      alignSelf: "flex-start",
      marginRight: undefined,
    },
    headerTextStyle: {
      color: colors.black,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "600",
    },
  };
};

export default getStyles;
