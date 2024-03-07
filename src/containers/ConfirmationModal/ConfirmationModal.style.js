import { Platform, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  headerText: {
    fontSize: 20,
    color: colors.black,
    marginTop: 20,
  },
  subHeaderText: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 22,
    marginTop: 8,
  },
  logo: {
    ...Platform.select({
      web: {
        height: 48,
        width: 48,
      },
      default: {
        height: 24,
        width: 24,
      },
    }),
  },
  cancelStyle: {
    ...Platform.select({
      web: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
      },
      default: {
        padding: 14,
      },
    }),
  },
  warningButtonStyle: {
    backgroundColor: colors.yellow,
    borderWidth: 0,
  },
  errorButtonStyle: {
    backgroundColor: colors.errorRed,
    borderWidth: 0,
  },
  warningTextStyle: {
    color: colors.black,
  },
  customTextStyle: {
    color: colors.white,
  },
  leftTextStyle: {
    fontSize: 14,
  },
  gapStyle: {
    ...Platform.select({
      web: {
        marginTop: 32,
      },
      default: {
        marginTop: 24,
      },
    }),
  },
  parentStyle: {
    ...Platform.select({
      web: {
        padding: 8,
      },
      default: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingTop: 24,
        paddingBottom: 24,
      },
    }),
  },
});

export const getTextStyle = (severity) => {
  switch (severity) {
    case "warning":
      return styles.warningTextStyle;
    case "error":
    case "success":
      return styles.customTextStyle;
    default:
      return {};
  }
};

export const getButtonStyle = (severity) => {
  switch (severity) {
    case "error":
      return styles.errorButtonStyle;
    case "warning":
      return styles.warningButtonStyle;
    case "success":
      return styles.successButtonStyle;
    default:
      return {};
  }
};

export default styles;
