import colors from "../../assets/colors";

export const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
    width: "100%",
    height: "100%",
  },
  outerContainer: {
    width: "100%",
    minHeight: "100%",
    paddingBottom: "48px",
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
    borderRadius: "24px",
    border: `1px solid ${colors.lightGrey}`,
    background: "#FFF",
    boxShadow: "0px 4px 32px 0px rgba(97, 108, 130, 0.04)",
    padding: "40px",
    width: "30vw",
    margin: "0 auto",
  },
  innerContainer1800: {
    width: "40vw",
  },
  innerContainer1400: {
    width: "50vw",
  },
  innerContainer1000: {
    width: "70vw",
  },
  innerContainer600: {
    width: "calc(100% - 48px)",
    padding: "32px",
  },
};
