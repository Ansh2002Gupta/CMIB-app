const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      position: "absolute",
      right: 0,
      top: 50,
      overflow: "hidden",
      zIndex: 3,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      cursor: "default",
    },
  };
};

export default getStyles;
