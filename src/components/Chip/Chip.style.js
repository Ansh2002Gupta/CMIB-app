const getStyles = (theme) => {
  const { colors } = theme;

  return {
    chipStyleWeb: (textColor, bgColor) => ({
      textAlign: "center",
      paddingLeft: 8,
      borderRadius: 16,
      paddingRight: 8,
      paddingTop: 2,
      paddingBottom: 2,
      backgroundColor: bgColor,
      color: textColor,
    }),
    chipStyle: (textColor) => ({
      textAlign: "center",
      marginRight: 16,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 2,
      paddingBottom: 2,
      color: textColor,
    }),
  };
};

export default getStyles;
