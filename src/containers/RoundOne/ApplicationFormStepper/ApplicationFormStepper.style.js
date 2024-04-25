const getStyles = (theme) => {
  const { colors } = theme;

  return {
    stepperContainer: {
      backgroundColor: colors.white,
      paddingTop: 24,
      paddingLeft: 24,
      paddingRight: 24,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: colors.lightGrey,
      overflow: "hidden",
    },
    container: {
      backgroundColor: colors.white,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderColor: colors.lightGrey,
    },
    headingContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
    },
    headingtext: {
      color: colors.black,
      fontSize: 20,
    },
    headingtextWeb: {
      color: colors.black,
      fontSize: 32,
    },
    headingContainerWeb: {
      paddingBottom: 24,
      paddingTop: 24,
    },
  };
};

export default getStyles;
