const getStyles = (theme) => {
  const { colors } = theme;

  return {
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    flexContainer: {
      flex: 1,
    },
    main: {
      paddingTop: 24,
      paddingLeft: 24,
      paddingRight: 24,
      flex: 1,
    },
    row: {
      flexDirection: "row",
      paddingBottom: 12,
    },
    tab: (isSelected) => ({
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
      marginRight: 12,
      borderRadius: 19,
      borderColor: isSelected ? colors.green : colors.lightGrey,
      borderWidth: 1,
      backgroundColor: isSelected ? colors.green : "transparent",
    }),
    tabText: (isSelected) => ({
      color: isSelected ? colors.white : colors.black,
      fontSize: 14,
    }),
    text: {
      fontSize: 32,
    },
  };
};

export default getStyles;
