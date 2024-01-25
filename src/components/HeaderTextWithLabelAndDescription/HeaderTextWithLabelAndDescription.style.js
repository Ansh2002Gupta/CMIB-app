import colors from "../../assets/colors";

export const style = {
  headerContainer: {
    marginTop: 24,
  },
  heading: {
    color: colors.black,
  },
  secondHeading: {
    color: colors.darkGrey,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  webDescriptionStyle: {
    marginTop: 16,
  },
  smHeaderText: {
    fontSize: 18,
  },
  lgHeaderText: {
    fontSize: 32,
  },
  mdHeaderText: {
    fontSize: 24,
  },
  headerText: {
    fontSize: 40,
  },
  labelText: {
    color: colors.subHeadingGray,
    fontSize: 16,
  },
};

export const getResponsiveStyles = ({ str, currentBreakpoint }) => {
  switch (str) {
    case "headerText": {
      if (currentBreakpoint === "xs") {
        return {
          ...style.headerText,
          ...style.smHeaderText,
        };
      }
      if (currentBreakpoint === "lg") {
        return {
          ...style.headerText,
          ...style.lgHeaderText,
        };
      }
      if (currentBreakpoint === "md" || currentBreakpoint === "sm") {
        return {
          ...style.headerText,
          ...style.mdHeaderText,
        };
      }
      return {
        ...style.headerText,
      };
    }
    default:
      return;
  }
};
