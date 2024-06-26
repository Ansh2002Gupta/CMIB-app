const getStyles = (theme) => {
  const { colors } = theme;

  return {
    get questionnaireExtendedViewStyle() {
      return (isExpanded) => ({
        height: isExpanded ? undefined : 70,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 24,
      });
    },
    buttonStyle: {
      marginBottom: 24,
      height: 44,
    },
    mobileButtonStyle: {
      marginBottom: 24,
      height: 60,
      backgroundColor: colors.secondaryGrey,
      justifyContent: "flex-start",
    },
    get buttonTextStyle() {
      return (isWebview) => ({
        color: isWebview ? colors.black : colors.darkBlue,
      });
    },
  };
};

export default getStyles;
