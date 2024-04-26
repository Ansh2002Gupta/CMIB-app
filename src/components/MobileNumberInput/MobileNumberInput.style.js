export const getStyles = (theme) => {
  const { colors } = theme;

  return {
    inputContainer: {
      flexDirection: "row",
    },
    codeInputStyle: {
      flex: 1,
    },
    numberInputStyle: {
      marginLeft: 24,
      flex: 2,
    },
    selectedView: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
    },
    labelField: {
      fontSize: 14,
    },
    iconStyles: {
      height: 20,
      width: 20,
    },
  };
};
