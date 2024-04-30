const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      position: "relative",
      zIndex: 10,
    },
    dropdownButton: {
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 8,
      paddingBottom: 8,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.lightGrey,
    },
    rowSelectedNumber: {
      fontSize: 14,
      marginRight: 8,
    },
    iconTicket: {
      height: 20,
      width: 20,
    },
    dropdown: {
      position: "absolute",
      bottom: 38,
      width: "100%",
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 5,
      backgroundColor: colors.white,
    },
    optionText: {
      padding: 10,
    },
  };
};

export default getStyles;
