import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    modalContent: (currentBreakpoint) => ({
      position: "absolute",
      top: 35,
      left: 0,
      backgroundColor: colors.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      zIndex: 1,
      ...Platform.select({
        web: {
          width:
            currentBreakpoint === "md"
              ? "150%"
              : currentBreakpoint === "sm"
              ? "120%"
              : "100%",
          height: "40vh",
          overflow: "auto",
        },
      }),
    }),
    option: {
      padding: 12,
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: "flex-start",
    },
    optionTextStyle: {
      fontSize: 14,
      marginLeft: 2,
      borderWidth: 0,
      color: colors.black,
    },
    inactiveStyle: {
      color: colors.lightGray,
    },
  };
};

export default getStyles;
