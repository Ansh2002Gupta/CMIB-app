import { StyleSheet } from "@unthinkable/react-core-components";

export const getStyles = (theme) => {
  const { colors } = theme;

  return {
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      zIndex: 30,
      display: "flex",
      alignItems: "center",
    },
    contentBox: {
      backgroundColor: colors.white,
      padding: 24,
      width: "90%",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
      borderRadius: "12px",
    },
    xsWidth: {
      maxWidth: 444,
    },
    smWidth: {
      maxWidth: 530,
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
  };
};

export const setMaxWidth = ({ maxWidth, theme }) => {
  const styles = getStyles(theme);

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
