const getStyles = (theme) => {
  const { colors } = theme;

  return {
    customStyle: { maxWidth: 300, marginTop: 24 },
    innerContainerStyle: {
      backgroundColor: colors.white,
    },
    iconHeaderStyle: {
      backgroundColor: colors.white,
      borderTopWidth: 0,
    },
    mobileContainerStyle: {
      flexDirection: "row",
      flex: 1,
      padding: 16,
    },
    iconStyle: {
      height: 20,
      width: 20,
    },
    flex1: {
      flex: 1,
    },
  };
};

export default getStyles;
