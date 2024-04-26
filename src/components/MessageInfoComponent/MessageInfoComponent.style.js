import { Platform } from "@unthinkable/react-core-components";

const getMaxWidth = (currentBreakpoint) => {
  switch (currentBreakpoint) {
    case "lg":
      return "40vw";
    case "xl":
      return "45vw";
    case "md":
      return "35vw";
    case "sm":
      return "50vw";
    case "xs":
      return "70vw";
    default:
      return "50vw";
  }
};

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    container: {
      alignItems: "center",
      margin: 10,
    },

    subContainer: {
      flexDirection: "row",
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.lightGrey,
      backgroundColor: colors.backgroundColor,
      justifyContent: "center",
    },
    textSize: (currentBreakpoint) => ({
      fontSize: 14,
      ...Platform.select({
        web: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: getMaxWidth(currentBreakpoint),
        },
      }),
    }),
  };
};

export default getStyles;
