const getStyles = (theme) => {
  const { colors } = theme;

  return {
    defaultBtnStyles: {
      maxHeight: 56,
      padding: 17,
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: colors.lightGrey,
      backgroundColor: colors.white,
      justifyContent: "center",
      alignContent: "center",
      color: colors.black,
      cursor: "pointer",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    greenBtn: {
      backgroundColor: colors.green,
      color: colors.white,
    },
    whiteText: {
      color: colors.white,
    },
    iconRightStyle: {
      marginRight: 8,
    },
    iconLeftStyle: {
      marginLeft: 8,
    },
    btnText: {
      fontSize: 16,
      lineHeight: 20,
    },
    containerStyle: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
  };
};

export default getStyles;
