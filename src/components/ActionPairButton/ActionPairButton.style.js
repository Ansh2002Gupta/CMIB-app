const getStyles = (theme) => {
  const { colors } = theme;
  return {
    buttonStyle: {
      flex: 1,
    },
    containerStyle: {
      flexDirection: "row",
    },
    secondButtonStyle: {
      marginLeft: 8,
    },
  };
};

export default getStyles;
