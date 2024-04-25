const getStyles = (theme) => {
  const { colors } = theme;

  return {
    contentContainerStyle: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    innerContainerStyle: {
      marginBottom: 16,
    },
    loaderStyle: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundColor,
    },
    datePickerContainer: {
      paddingBottom: 0,
    },
  };
};

export default getStyles;
