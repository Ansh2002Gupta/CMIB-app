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
      alignItems: "flex-end",
    },
    tabContainer: {
      paddingTop: 16,
      paddingRight: 16,
      paddingLeft: 16,
      backgroundColor: colors.white,
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
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
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
    scrollViewContainer: { 
      flex: 1,
      borderBottomColor: colors.green,
      borderBottomWidth:1,
    },
  };
};

export default getStyles;
