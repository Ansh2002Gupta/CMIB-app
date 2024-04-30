const getStyles = (theme) => {
  const { colors } = theme;

  return {
    searchParent: {
      height: 44,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      backgroundColor: colors.white,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 16,
      paddingRight: 16,
    },
    searchInput: {
      backgroundColor: colors.white,
      marginLeft: 8,
      flex: 1,
    },
    clearIcon: {
      height: 15,
      width: 15,
    },
  };
};

export default getStyles;
