const getStyles = (theme) => {
  const { colors } = theme;
  return {
    selectedItemsContainer: {
      backgroundColor: colors.secondaryGrey,
      padding: 8,
      flexDirection: "row",
      borderRadius: 16,
      marginTop: 4,
      marginRight: 4,
      alignItems: "center",
    },
    iconCloseDark: {
      height: 15,
      width: 15,
      marginLeft: 4,
    },
  };
};

export default getStyles;
