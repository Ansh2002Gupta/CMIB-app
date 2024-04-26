const getStyles = (theme) => {
  const { colors } = theme;

  return {
    buttonContainer: {
      padding: 16,
      backgroundColor: colors.backgroundColor,
    },
    buttonStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.lightGray,
      borderRadius: 8,
      paddingTop: 12,
      paddingBottom: 12,
      marginBottom: 24,
      width: 192,
    },
    mobButtonStyle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondaryGrey,
      paddingLeft: 14,
      paddingTop: 14,
      paddingBottom: 14,
      marginBottom: 24,
    },
    buttonTextStyle: {
      fontSize: 14,
    },
    mobTextStyle: {
      color: colors.darkBlue,
      fontSize: 14,
    },
    customButtonStyle: {
      height: 44,
      width: 135,
    },
    webButtonContainer: {
      width: "100%",
      alignItems: "flex-end",
    },
  };
};

export default getStyles;
