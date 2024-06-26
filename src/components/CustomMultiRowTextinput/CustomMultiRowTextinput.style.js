const getStyles = (theme) => {
  const { colors } = theme;

  return {
    customWebContainerStyle: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 0.2fr",
      alignItems: "center",
      overflowX: "auto",
      width: "100%",
    },
    detailErrorViewStyle: {
      position: "absolute",
      bottom: 6,
    },
    customContainerStyle: {
      flexDirection: "row",
    },
    customTableStyle: {
      backgroundColor: colors.white,
      padding: 0,
      marginBottom: 16,
      borderWidth: 0.5,
      marginTop: 16,
      borderRadius: 16,
      overflow: "hidden",
      borderColor: colors.lightGrey,
      flex: undefined,
    },
  };
};

export default getStyles;
