const getStyles = (theme) => {
  const { colors } = theme;

  return {
    containerStyle: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      paddingTop: 24,
      paddingRight: 24,
      paddingLeft: 24,
      borderRadius: 16,
    },
  };
};

export default getStyles;
