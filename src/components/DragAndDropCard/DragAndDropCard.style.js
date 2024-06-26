import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    contentContainerStyle: {
      height: 240,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.darkGrey,
      borderStyle: "dashed",
      justifyContent: "center",
      backgroundColor: colors.secondaryGrey,
      alignItems: "center",
      width: "auto",
    },
    loaderBox: {
      position: "relative",
    },
    percentageBox: {
      position: "absolute",
      left: "50%",
      top: "35%",
    },
    percentageBoxTwoDigitNumber: {
      left: "45%",
    },
    percentageText: {
      fontSize: 12,
      lineHeight: 16,
      color: colors.darkGrey,
    },
    textContainer: {
      flexDirection: "row",
      marginTop: 24,
      marginBottom: 10,
    },
    textStyle: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.darkBlack,
      marginRight: 4,
    },
    browseStyle: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.green,
      textDecorationLine: "underline",
      ...Platform.select({
        web: { cursor: "pointer" },
      }),
    },
    infoStyle: {
      textAlign: "center",
      color: colors.darkGrey,
      lineHeight: 18,
      marginLeft: 24,
      marginRight: 24,
    },
    hideRawInputField: {
      display: "none",
    },
    error: {
      marginTop: 10,
      textAlign: "center",
    },
    spinnerStyle: {
      margin: 8,
    },
  };
};

export default getStyles;
