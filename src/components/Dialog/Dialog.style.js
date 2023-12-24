import colors from "../../assets/colors";

export const styles = {
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
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 600,
  },
  dialogCloseBtn: {
    cursor: "pointer",
  },
};

export const setMaxWidth = ({ maxWidth }) => {
  switch (maxWidth) {
    case "xs":
      return styles.xsWidth;
    case "sm":
      return styles.smWidth;
    case "md":
      return styles.mdWidth;
    case "lg":
      return styles.lgWidth;
    case "xl":
      return styles.xlWidth;
    default:
      return styles.defaultMaxWidth;
  }
};
