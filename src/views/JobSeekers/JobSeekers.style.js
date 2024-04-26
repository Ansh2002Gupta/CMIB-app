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
    badgeContainerStyle: {
      paddingBottom: 0,
    },
    labelStyle: {
      fontSize: 12,
      ...Platform.select({
        web: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: 50,
        },
      }),
    },
    tableHeadingText: {
      fontWeight: "600",
      color: colors.darkGrey,
    },
    iconMore: {
      height: 20,
      width: 20,
    },
    iconTicketColoum: {
      alignItems: "center",
    },
    sortingIcon: {
      height: 16,
      width: 16,
    },
    tableContent: {
      height: "90%",
    },
    cursorStyle: { cursor: "pointer" },
  };
};

export default getStyles;
