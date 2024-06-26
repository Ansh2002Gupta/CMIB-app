import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    contentContainerStyle: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    loaderStyle: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      backgroundColor: colors.backgroundColor,
    },
    contentStyle: {
      paddingBottom: 8,
    },
    innerContainerStyle: {
      marginBottom: 16,
    },
    textContainer: {
      flexDirection: "row",
      paddingBottom: 24,
      alignItems: "center",
    },
    editContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    textStyle: {
      paddingRight: 8,
      paddingLeft: 8,
      fontSize: 14,
    },
    cardContainer: {
      paddingTop: 14,
      paddingBottom: 14,
    },
    cardStyle: {
      marginLeft: 16,
      marginRight: 16,
      marginTop: 24,
    },
    imageContainer: {
      marginBottom: 24,
      ...Platform.select({
        web: {
          maxWidth: 374,
        },
      }),
    },
    headingText: {
      fontSize: 16,
      color: colors.darkGrey,
    },
    valueStyle: {
      marginLeft: 4,
      fontSize: 16,
      color: colors.black,
    },
    badgeContainer: {
      marginBottom: 8,
    },
    headerText: {
      fontSize: 16,
    },
    customCardStyle: {
      marginTop: 16,
      marginBottom: 24,
      marginRight: 0,
      marginLeft: 0,
      padding: 0,
    },
    balanceInputStyle: {
      width: "30%",
    },
    customContainerStyle: {
      gridTemplateColumns: "1fr 1fr",
    },
    headerTextStyle: {
      paddingBottom: 8,
    },
    infoStyle: {
      marginBottom: 24,
      color: colors.darkGrey,
      fontSize: 14,
      lineHeight: 24,
    },
    containerGridStyle: (columnCount) => ({
      display: "grid",
      gridTemplateColumns: columnCount || "1fr 1fr 1fr",
      paddingBottom: 8,
    }),
    datePickerContainer: {
      paddingBottom: 0,
    },
  };
};

export default getStyles;
