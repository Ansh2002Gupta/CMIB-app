import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    cellTextStyle: (fontSize = 14) => ({
      fontSize,
      ...Platform.select({
        web: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: "100%",
        },
      }),
    }),
    container: {
      flex: 1,
      marginTop: 24,
    },
    borderStyle: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      marginTop: 16,
      marginBottom: 16,
    },
    currentPackageText: {
      fontSize: 16,
      color: colors.darkGrey,
      lineHeight: 24,
      marginBottom: 16,
    },
    subscriptionHistoryText: {
      fontSize: 16,
      color: colors.darkGrey,
      lineHeight: 24,
      marginTop: 16,
    },
    packageNameText: {
      fontSize: 24,
      color: colors.black,
      flexWrap: "wrap",
      overFlow: "hidden",
      whiteSpace: "break-space",
      wordBreak: "break-word",
    },
    packagePriceText: {
      fontSize: 32,
      color: colors.black,
      lineHeight: 44,
    },
    packageValidityText: {
      fontSize: 16,
      color: colors.black,
    },
    packageDescriptionText: {
      fontSize: 14,
      color: colors.black,
      lineHeight: 20,
      flexWrap: "wrap",
      marginTop: 16,
      marginBottom: 16,
    },
    badgeLabelContainer: {
      flex: 1,
      marginBottom: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    badgeLabelContainerMob: {
      flex: 1,
      marginBottom: 24,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    viewOtherText: {
      fontSize: 14,
      color: colors.black,
      lineHeight: 20,
    },
    renewSubscriptionText: {
      color: colors.white,
      fontSize: 14,
      lineHeight: 20,
    },
    tableHeadingText: {
      fontWeight: "600",
      color: colors.darkGrey,
    },
  };
};

export default getStyles;
