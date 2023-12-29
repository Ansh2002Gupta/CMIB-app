import colors from "../../assets/colors";

export const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 48,
    flex: 1,
    zIndex: 1,
  },
  responsiveContainer: { paddingTop: 48 },
  outerContainer: {
    width: "100%",
    minHeight: "100%",
    paddingBottom: 48,
    display: "flex",
    alignItems: "center",
  },
  defaultInnerContainerStyles: {
    flex: 1,
  },
  defaultOuterContainerStyles: {
    flex: 1,
  },
  innerContainer: {
    borderRadius: 24,
    border: `1px solid ${colors.lightGrey}`,
    background: "#FFF",
    boxShadow: "0px 4px 32px 0px rgba(97, 108, 130, 0.04)",
    padding: 40,
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 600,
  },
  innerContainer1800: {
    width: "40%",
  },
  innerContainer1400: {
    width: "45%",
  },
  innerContainer1000: {
    width: "75%",
  },
  innerContainer600: {
    width: "75%",
    padding: 32,
  },
};
