const getStyles = (theme) => {
  const { colors } = theme;

  return {
    row: (isWebView) => ({
      flexDirection: isWebView ? "row" : "column",
    }),
    inputStyle: (isWebView) => ({
      flex: 1,
      marginRight: isWebView ? 24 : 0,
    }),
    nationalityInputStyle: {
      flex: 1,
    },
    jobLocationInputStyle: {
      flex: 2.06,
    },
    functionalAreaInputStyle: {
      flex: 2.1,
    },
    genderPreferenceInputStyle: (isWebView) => ({
      flex: 1,
      marginRight: isWebView ? 24 : 0,
    }),
    categoryPreferenceInputStyle: (isWebView) => ({
      flex: 1,
      marginRight: isWebView ? 24 : 0,
    }),
    emptyViewStyle: {
      flex: 1,
    },
  };
};

export default getStyles;
