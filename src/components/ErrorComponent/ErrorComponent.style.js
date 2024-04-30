const getStyles = (theme) => {
  const { colors } = theme;

  return {
    containerStyle: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      paddingBottom: 100,
    },
    innerContainer: {
      maxWidth: 500,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      padding: 16,
      borderRadius: 12,
    },
    errorMessage: {
      fontSize: 14,
      marginBottom: 20,
    },
    erroButtonStyle: {
      backgroundColor: colors.red,
    },
    buttonText: {
      color: colors.white,
    },
    errorHeading: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 20,
      marginLeft: 5,
    },
    iconError: {
      height: 50,
      width: 50,
      marginBottom: 10,
    },
  };
};

export default getStyles;
