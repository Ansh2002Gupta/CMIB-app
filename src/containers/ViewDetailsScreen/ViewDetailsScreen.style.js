import colors from "../../assets/colors";

const style = {
  headerContainer: {
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 32,
    lineHeight: 40,
    color: colors.black,
  },
  editContainer: {
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    maxWidth: 250,
    maxHeight: 44,
  },
  textStyle: {
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 14,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  candidateDetailsOuterContainer: {
    width: "30%",
    gap: 16,
    justifyContent: "space-between",
    marginBottom: 24,
  },
  key: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  value: { fontSize: 14, color: colors.black },
  divider: {
    height: 19,
    width: 1,
    backgroundColor: colors.lightGrey,
  },
  backButton: {
    height: 24,
    width: 24,
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  saveButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
    width: "40vw",
  },
  shortProfileOuterContainer: {
    flex: 1,
    alignItems: "flex-start",
    width: "37vw",
  },
  shortProfileInnerContainer: {
    flex: 1,
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export const getResponsiveStyles = ({ str, currentBreakpoint }) => {
  switch (str) {
    case "titleText": {
      if (currentBreakpoint === "xs") {
        return {
          ...style.titleText,
          fontSize: 16,
        };
      }
      if (currentBreakpoint === "lg") {
        return {
          ...style.titleText,
          fontSize: 20,
        };
      }
      if (currentBreakpoint === "md" || currentBreakpoint === "sm") {
        return { ...style.titleText, fontSize: 16 };
      }
      return { ...style.titleText, fontSize: 16 };
    }
    default:
      return;
  }
};

export default style;
