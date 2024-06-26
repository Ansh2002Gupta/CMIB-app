import { Platform } from "@unthinkable/react-core-components";

const getColumnCount = (detail) => {
  if (detail.length === 3) return "1fr 1fr 1fr";
  if (detail.length === 2) return "1fr 1fr";
  if (detail.length === 1) return "1fr";
};

const getStyles = (theme) => {
  const { colors = {} } = theme;

  return {
    titleContainer: {
      flexDirection: "row",
    },
    titleStyle: {
      color: colors.darkGrey,
      fontSize: 12,
      marginBottom: 8,
    },
    inputStyle: {
      paddingBottom: 24,
    },
    tableHeaderText: {
      color: colors.darkGrey,
      fontSize: 16,
      paddingBottom: 24,
    },
    footerText: {
      fontSize: 14,
      fontStyle: "italic",
      paddingBottom: 24,
    },
    headerText: {
      fontSize: 16,
      paddingBottom: 24,
    },
    innerContainer: {
      width: "100%",
      marginRight: 24,
    },
    rowStyle: {
      width: "60%",
    },
    minorRowStyle: {
      width: "30%",
    },
    starStyle: {
      marginLeft: 4,
      color: colors.errorRed,
    },
    webContainer: {
      marginRight: 24,
    },
    linkStyle: {
      color: colors.darkBlue,
      textDecorationLine: "underline",
    },
    valueStyle: {
      ...Platform.select({
        web: {
          wordBreak: "break-word",
        },
      }),
      fontSize: 14,
      color: colors.black,
      marginBottom: 24,
    },
    capitalizeValue: {
      textTransform: "capitalize",
    },
    containerStyle: {
      flexDirection: "column",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    divideInputStyle: {
      width: "48%",
    },
    badgeContainer: {
      marginBottom: 8,
    },
    containerGridStyle: (columnCount) => ({
      display: "grid",
      gridTemplateColumns: columnCount || "1fr 1fr 1fr",
    }),
    labelStyle: {
      fontSize: 14,
      marginLeft: 8,
      marginBottom: 24,
    },
    switchContainer: {
      flexDirection: "row",
      gap: 8,
      justifyContent: "flex-end",
    },
    iconStyle: {
      alignItems: "flex-start",
    },
    buttonContainer: {
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.lightGray,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 14,
      paddingBottom: 14,
      marginBottom: 24,
    },
    removeTextStyle: {
      marginLeft: 4,
      fontSize: 16,
    },
    oneThirdWidth: {
      width: "33%",
    },
    cancelButton: {
      position: "absolute",
      right: 0,
    },
    CheckBoxSelection: {
      paddingRight: 16,
      marginTop: 0,
      flexDirection: "row",
      flex: 1,
    },
    chipDataContainer: { flexDirection: "row" },
    getVariableContainerStyles: (detail) => {
      return {
        display: "grid",
        gridTemplateColumns: getColumnCount(detail),
      };
    },
    getFieldWidth: (width, isMobileView, customWidthValue) => {
      if (isMobileView) {
        return { width: "100%" };
      }
      switch (width) {
        case 1: {
          return {
            width: "100%",
          };
        }
        case 2: {
          return {
            width: "75%",
          };
        }
        case 3: {
          return {
            marginRight: 24,
          };
        }
        case 4: {
          return {
            width: 200,
          };
        }
        case 5: {
          return {
            width: customWidthValue,
          };
        }
        default: {
          return {
            width: "100%",
          };
        }
      }
    },
    quilStyle: { height: "auto", borderWidth: 0, padding: 0 },
    quillContainerStyle: { borderWidth: 0, marginBottom: 24, padding: 0 },
  };
};

export const getRowStyle = (detail, theme) => {
  const styles = getStyles(theme);

  if (detail.isMajor) {
    return styles.rowStyle;
  }
  if (detail.isMinor) {
    return styles.minorRowStyle;
  }
  if (detail.isRow) {
    return styles.divideInputStyle;
  }
  return styles.innerContainer;
};

export const getContainerStyles = ({
  columnCount,
  isColumnVariableWidth,
  isWebView,
  theme,
}) => {
  const styles = getStyles(theme);

  if (isColumnVariableWidth) {
    return {};
  }
  if (isWebView) {
    return styles.containerGridStyle(columnCount);
  }
  return styles.containerStyle;
};

export default getStyles;
