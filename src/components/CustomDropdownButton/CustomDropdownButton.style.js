const getStyles = (theme) => {
  const { colors } = theme;

  return {
    textStyle: {
      color: colors.darkBlue,
    },
    iconStyle: {
      height: 16,
      width: 16,
    },
  };
};

export default getStyles;
