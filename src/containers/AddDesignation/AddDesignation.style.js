const getStyles = (theme) => {
  const { colors } = theme;

  return {
    containerStyle: {
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    },
    saveStyle: {
      backgroundColor: colors.green,
      marginLeft: 16,
    },
    gapBetween: {
      marginBottom: 24,
    },
    gapTop: {
      marginTop: 24,
    },
    rightButtonStyle: {
      marginLeft: 8,
    },
    rightButtonDisableStyle: {
      marginLeft: 8,
      backgroundColor: colors.disabledGrey,
    },
    webView: {
      inputLabelText: {
        color: colors.black,
        fontSize: 14,
        lineHeight: 24,
        textTransform: "capitalize",
      },
      inputTextBox: {
        background: colors.white,
        marginTop: 0,
      },
    },
  };
};

export default getStyles;
