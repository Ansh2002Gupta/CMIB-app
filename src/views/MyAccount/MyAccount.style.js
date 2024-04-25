import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    optionCotainer: {
      flexDirection: "row",
      padding: 18,
      alignItems: "center",
      ...Platform.select({
        web: {
          padding: 12,
          paddingLeft: 16,
          paddingRight: 16,
        },
      }),
    },
    optionCotainerBorder: {
      borderBottomWidth: 1,
      borderColor: colors.lightGrey,
    },
    optionCotainerBordeLight: {
      borderBottomWidth: 0.2,
      borderColor: colors.lightGrey,
    },
    profileParentContainer: {
      flex: 1,
      backgroundColor: colors.white,
      height: "100%",
      ...Platform.select({
        web: {
          maxHeight: "80vh",
        },
      }),
    },
    profileListContainer: {
      flex: 1,
    },
    profileContainer: {
      marginTop: 16,
      marginBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    profileContainerWeb: {
      marginTop: 16,
      marginBottom: 24,
      paddingLeft: 16,
      marginRight: 16,
      alignItems: "flex-start",
    },
    initialsContainer: {
      justifyContent: "center",
      borderRadius: 200,
      alignItems: "center",
      height: 48,
      width: 48,
      backgroundColor: colors.black,
    },
    detailContainer: {
      marginLeft: 12,
    },
    detailContainerWeb: {
      marginTop: 12,
    },
    fullNameStyle: {
      fontSize: 16,
      color: colors.black,
    },
    emailStyle: {
      fontSize: 14,
      color: colors.darkGrey,
    },
    titleParentStyle: {
      paddingLeft: 12,
      paddingRight: 12,
      flex: 1,
    },
    titleStyle: {
      fontSize: 14,
      lineHeight: 20,
      paddingLeft: 12,
      color: colors.black,
    },
    iconContainer: {
      alignItems: "flex-end",
    },
    leftIcon: {
      width: 24,
      height: 24,
    },
    arrowIcon: {
      width: 16,
      height: 16,
    },
    horizontalLine: {
      width: "100%",
      height: 1,
      backgroundColor: colors.lightGrey,
    },
    initialTextStyle: {
      fontSize: 20,
      color: colors.white,
    },
    omitIconStyle: {
      width: 240,
    },
    customImageStyle: {
      height: 48,
      width: 48,
    },
  };
};

export default getStyles;
