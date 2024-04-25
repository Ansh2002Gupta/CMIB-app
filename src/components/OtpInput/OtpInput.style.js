const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flexDirection: "column",
    },
    labelContainer: {
      flexDirection: "row",
      marginBottom: 4,
    },
    label: {
      color: colors.gray,
      fontSize: 14,
      lineHeight: 24,
    },
    webLabel: {
      color: colors.black,
    },
    starStyle: {
      color: colors.errorRed,
    },
    otpContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    webOtpContainer: {
      gap: 16,
    },
    appOtpContainer: {
      justifyContent: "space-between",
    },
    activeOtpBox: {
      borderColor: colors.green,
    },
    otpBox: {
      width: 74,
      height: 56,
      borderWidth: 1,
      borderColor: colors.lightGray,
      borderRadius: 12,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "500",
    },
    webOtpBox: {
      width: "100%",
      borderStyle: "solid",
    },
    errorMsg: {
      color: colors.errorRed,
      fontSize: 12,
      lineHeight: 18,
    },
  };
};

export default getStyles;
