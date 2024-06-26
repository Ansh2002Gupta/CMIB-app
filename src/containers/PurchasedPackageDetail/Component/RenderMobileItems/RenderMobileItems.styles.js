const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flexDirection: "row",
      width: "90%",
      borderBottomWidth: 1,
      margin: 16,
      backgroundColor: colors.white,
      borderColor: colors.lightGray,
      paddingBottom: 12,
      zIndex: 1,
    },
    borderBottom0: {
      borderBottomWidth: 0,
      paddingBottom: 4,
    },
    flex1: {
      flex: 1,
      backgroundColor: colors.white,
    },
    font14: {
      fontSize: 14,
    },
    innerContainer: {
      flexDirection: "row",
      marginTop: 4,
      alignItems: "center",
    },
    textStyle: {
      fontSize: 12,
      color: colors.darkGrey,
    },
    get marginLeft() {
      return (value) => ({
        marginLeft: value,
      });
    },
  };
};

export default getStyles;
