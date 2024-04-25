import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    cropperContainer: {
      position: "relative",
      overflowY: "auto",
      padding: "16 24",
      borderTop: `1px solid rgba(0, 0, 0, 0.12)`,
      borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
      backgroundColor: colors.greyFour,
      ...Platform.select({
        web: {
          height: "35vh",
        },
      }),
      borderRadius: 16,
    },
    actionBtnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 8,
      marginTop: 32,
    },
    customContainerStyle: {
      ...Platform.select({
        web: {
          wordBreak: "break-word",
          paddingTop: 8,
        },
      }),
    },
    customTextStyle: {
      fontSize: 14,
      color: colors.errorRed,
    },
    buttonStyle: {
      minWidth: 125,
    },
    additionalStyles: {
      ...Platform.select({
        web: {
          cursor: "not-allowed",
        },
      }),
    },
    cropAreaStyle: {
      borderWidth: 2,
      borderColor: colors.white,
    },
  };
};

export default getStyles;
