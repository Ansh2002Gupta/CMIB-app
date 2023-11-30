import colors from "../../assets/colors";

export const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 48,
    width: "100%",
    height: "100%",
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
    height: "100%",
  },
  defaultOuterContainerStyles: {
    height: "100%",
  },
  innerContainer: {
    borderRadius: 24,
    border: `1px solid ${colors.lightGrey}`,
    background: "#FFF",
    boxShadow: "0px 4px 32px 0px rgba(97, 108, 130, 0.04)",
    padding: 40,
    width: "30%",
    margin: "0 auto",
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
