import {
  StyleSheet,
  Dimensions,
  Platform,
} from "@unthinkable/react-core-components";

const { height: deviceHeight } = Dimensions.get("window");

const basetextStyle = {
  fontSize: 14,
  flexWrap: "wrap",
  maxWidth: 480,
  wordBreak: "break-word",
  overFlow: "hidden",
  whiteSpace: "break-space",
};

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    headerText: {
      color: colors.darkGrey,
      fontSize: 14,
    },
    formalText: {
      ...basetextStyle,
    },
    redText: {
      color: colors.red,
    },
    headingContainer: {
      flexDirection: "row",
      paddingBottom: 8,
      paddingTop: 8,
    },
    headingValueContainer: {
      marginRight: 16,
    },
    detailsSection: {
      flexDirection: "row",
      flexWrap: "wrap",
      ...Platform.select({
        web: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        },
      }),
    },
    headingText: {
      fontSize: 16,
      marginBottom: 16,
    },
    linkText: {
      ...basetextStyle,
      color: colors.darkBlue,
      textDecorationLine: "underline",
    },
    marginTop: {
      marginTop: 20,
    },
    loadingStyleNoData: {
      backgroundColor: colors.white,
      alignItems: "center",
      padding: 30,
      borderRadius: 16,
    },
    noMoreData: {
      textAlign: "center",
      fontSize: 14,
      color: colors.lightGrey,
    },
  };
};

export const getModalInnerContainerHeight = (parameter = 0.6) => {
  return {
    height: deviceHeight * parameter,
  };
};

export default getStyles;
