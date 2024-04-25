import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      flex: 1,
      overflow: "hidden",
      ...Platform.select({
        web: {
          marginBottom: 20,
        },
      }),
    },
    innerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: 16,
      alignItems: "flex-end",
    },
    tabContainer: {
      paddingTop: 16,
      paddingRight: 16,
      paddingLeft: 16,
      flex: 1,
    },
    marginLeft8: {
      marginLeft: 4,
    },
    itemContainer: {
      height: 36,
      paddingLeft: 16,
      paddingRight: 16,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      cursor: "pointer",
    },
    editButtonViewStyle: {
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      paddingRight: 12,
      paddingLeft: 12,
      borderColor: colors.lightGrey,
      paddingTop: 8,
      paddingBottom: 8,
      height: 36,
    },
    editIconStyle: {
      height: 20,
      width: 30,
    },
    activeItemContainer: {
      backgroundColor: colors.green,
      borderColor: "transparent",
    },
    itemText: {
      color: colors.black,
      fontSize: 14,
      lineHeight: 20,
    },
    activeItemText: {
      color: colors.white,
    },
    flex1: {
      flex: 1,
    },
  };
};

export default getStyles;
