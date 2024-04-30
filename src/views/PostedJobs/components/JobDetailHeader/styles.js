import { Dimensions, Platform } from "@unthinkable/react-core-components";

const { width: deviceWidth } = Dimensions.get("window");

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      backgroundColor: colors.white,
      padding: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: colors.lightGrey,
    },
    webProfileImageStyle: {
      height: 108,
      width: 108,
    },
    mobileProfileImageStyle: {
      height: 52,
      width: 52,
    },
    companyLogo: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      borderRadius: 12,
      alignSelf: "flex-start",
      overflow: "hidden",
      marginRight: 24,
    },
    bar: {
      marginRight: 10,
      marginLeft: 10,
    },
    compensationText: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "500",
      color: colors.black,
      ...Platform.select({
        web: {
          flexShrink: "unset",
          flexWrap: "wrap",
          wordBreak: "break-word",
          maxWidth:
            deviceWidth > 1100
              ? deviceWidth * 0.4
              : deviceWidth > 590
              ? deviceWidth * 0.3
              : deviceWidth * 0.8,
        },
      }),
    },
    contractText: {
      marginLeft: 4,
    },
    locationTextMobile: { marginTop: 4 },
    headerDescription: { marginTop: 8 },
    descriptionContent: { flexDirection: "row", alignItems: "center" },
    textWithIcon: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerDescriptionIcon: {
      marginRight: 8,
    },
    chip: {
      marginRight: 0,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 6,
      paddingBottom: 6,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "600",
    },
    chipView: {
      borderRadius: 18,
      marginRight: 12,
      alignSelf: "flex-start",
      overflow: "hidden",
    },
    locationTextContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerChip: { marginTop: 8, flexDirection: "row" },
    headerTitleContainer: { flexDirection: "row" },
    companyName: {
      fontSize: 24,
      lineHeight: 34,
      fontWeight: "600",
      color: colors.black,
    },
    designation: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "600",
      color: colors.darkBlue,
      marginTop: 8,
    },
    companyInfo: {
      flex: 1,
    },
    locationTextContainerMobile: {
      marginTop: 4,
    },
    headerDetails: {
      flex: 1,
    },
  };
};

export default getStyles;
