import { Platform } from "@unthinkable/react-core-components";

const styles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      backgroundColor: colors.red,
    },
    flexRow: {
      flexDirection: "row",
    },
    arrayStyle: {
      padding: 2,
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: colors.secondaryGrey,
      borderRadius: 16,
      marginRight: 4,
      justifyContent: "center",
    },
    chipText: {
      ...Platform.select({
        web: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: 150,
        },
      }),
    },
    iconTicketColoum: {
      backgroundColor: colors.white,
    },
    sortingIcon: {
      height: 16,
      width: 16,
      marginLeft: 5,
    },
    popupMessageStyle: {
      position: "absolute",
      top: 0,
      right: 50,
      height: "auto",
      width: "auto",
      minWidth: 250,
    },

    mobileContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 16,
      paddingBottom: 16,
      paddingRight: 24,
      paddingLeft: 24,
      borderBottomWidth: 1,
      borderColor: colors.greyOne,
      backgroundColor: colors.white,
      zIndex: 0,
      position: "relative",
    },

    tableQueryText: {
      color: colors.darkGrey,
      zIndex: 0,
    },

    rowsPerPageWeb: {
      flexDirection: "row",
      alignItems: "center",
    },

    iconTicket: {
      height: 20,
      width: 20,
    },

    popupMessageStyle: {
      position: "absolute",
      top: 0,
      right: 15,
      height: "auto",
      width: "auto",
      minWidth: 233,
    },
    descriptionRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    dot: {
      height: 4,
      width: 4,
      backgroundColor: colors.lightGrey,
      borderRadius: 2,
      marginLeft: 6,
      marginRight: 6,
      marginTop: 2,
    },
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
    rowDetail: { flex: 1 },
  };
};

export default styles;
