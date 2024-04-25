const getStyles = (theme) => {
  const { colors } = theme;

  return {
    buttonTwo: {
      backgroundColor: colors.errorRed,
    },
    buttonTwoText: {
      textColor: colors.white,
    },
  };
};

export default getStyles;
