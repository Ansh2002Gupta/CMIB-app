const getStyles = (theme) => {
  const { colors } = theme;

  return {
    borderStyle: {
      borderBottomWidth: 1,
      borderColor: colors.lightGrey,
      margin: 0,
    },
  };
};

export default getStyles;
