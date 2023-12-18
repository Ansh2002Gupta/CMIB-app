import colors from "../../assets/colors";

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 20,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modal: {
    position: "fixed",
    top: "20vh",
    width: "100%",
    zIndex: 30,
    display: "flex",
    alignItems: "center",
  },
  contentBox: {
    backgroundColor: colors.white,
    padding: 16,
    width: "90%",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "14px",
  },
  xsWidth: {
    maxWidth: 444,
  },
  smWidth: {
    maxWidth: 600,
  },
  mdWidth: {
    maxWidth: 900,
  },
  lgWidth: {
    maxWidth: 1200,
  },
  xlWidth: {
    maxWidth: 1536,
  },
  defaultMaxWidth: {
    maxWidth: "90%",
  },
};

export default styles;
