const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 48,
      flex: 1,
      zIndex: 1,
      paddingTop: 0,
    },
    responsiveContainer: { paddingTop: 48 },
    outerContainer: {
      width: "100%",
      minHeight: "100%",
      paddingBottom: 48,
      display: "flex",
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    defaultInnerContainerStyles: {
      flex: 1,
      border: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    defaultOuterContainerStyles: {
      flex: 1,
      paddingBottom: 0,
    },
    innerContainer: {
      flex: 1,
      borderRadius: 24,
      border: `1px solid ${colors.lightGrey}`,
      background: "#FFF",
      boxShadow: "0px 4px 32px 0px rgba(97, 108, 130, 0.04)",
      padding: 40,
      width: "40%",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 600,
      maxHeight: 780,
    },
    innerContainer1800: {
      width: "50%",
    },
    innerContainer1400: {
      width: "50%",
    },
    innerContainer1000: {
      width: "75%",
    },
    innerContainer600: {
      width: "75%",
      padding: 32,
    },
  };
};

export default getStyles;
