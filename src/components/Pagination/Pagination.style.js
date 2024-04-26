import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    pagination: {
      borderRadius: 2,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    paginationRange: {
      flexDirection: "row",
      marginLeft: 16,
      marginRight: 16,
      alignItems: "center",
    },
    previousText: {
      fontSize: 14,
      marginRight: 8,
    },
    activeText: {
      fontSize: 14,
      color: colors.darkBlue,
      lineHeight: 20,
    },
    inActiveText: {
      fontSize: 14,
      color: colors.darkGrey,
    },
    activeButton: {
      paddingLeft: 8,
      paddingRight: 8,
      width: 36,
      height: 36,
      paddingTop: 8,
      paddingBottom: 8,
      borderColor: colors.darkBlue,
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: colors.secondaryGrey,
    },
    inActiveButton: {
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 8,
      paddingBottom: 8,
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    dotsStyles: {
      marginHorizontal: 5,
    },
    disabled: {
      opacity: 0.5,
      backgroundColor: colors.white,
      cursor: Platform.OS.toLowerCase() === "web" ? "not-allowed" : "",
    },
  };
};

export default getStyles;
