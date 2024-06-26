const getStyles = (theme) => {
  const { colors } = theme;

  return {
    deletetextContainer: {
      backgroundColor: colors.white,
      position: "absolute",
      right: 16,
      top: 90,
      zIndex: 10,
      padding: 16,
      width: 240,
      height: 54,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 8,
    },
    zIndexOuter: {
      zIndex: 5,
    },
    zIndexInner: {
      zIndex: 100,
    },
    containerStyle: {
      flexDirection: "row",
      height: 20,
      width: 20,
    },
    popUpArrayView: {
      position: "absolute",
      right: 8,
      top: 0,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 8,
      zIndex: 20,
      backgroundColor: colors.white,
    },
    deletetext: {
      fontSize: 14,
      marginRight: 4,
    },
    popUpComponentStyle: {
      backgroundColor: colors.white,
      padding: 16,
      width: 240,
      height: 54,
      borderColor: colors.lightGrey,
      borderRadius: 8,
      alignItems: "center",
    },
    spinner: {},
  };
};

export default getStyles;
