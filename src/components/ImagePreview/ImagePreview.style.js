import { Dimensions, Platform } from "@unthinkable/react-core-components";

const { height: HEIGHT } = Dimensions.get("window");

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    fullImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    closeButton: {
      position: "absolute",
      top: 20,
      right: 20,
      padding: 10,
      zIndex: 1,
    },
    transformerImageWrapper: {
      backgroundColor: "transparent",
      padding: 0,
      borderWidth: 0,
      borderRadius: 0,
      alignItems: "center",
      position: "relative",
      boxShadow: "none",
    },
    iconCloseDarkBtn: {
      marginBottom: 30,
      backgroundColor: colors.lightGrey,
      opacity: 0.8,
      borderRadius: 20,
      padding: 5,
    },
    zoomBtnContainer: {
      flexDirection: "row",
      marginTop: 30,
      gap: 10,
    },
    iconZoomBtnParent: {
      backgroundColor: colors.lightGrey,
      opacity: 0.8,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      width: 40,
    },
    iconZoomBtn: {
      height: 20,
      width: 20,
    },
    closeIconImage: {
      position: "absolute",
      zIndex: 2,
      top: 40,
      right: 10,
    },
    previewImage: {
      ...Platform.select({
        web: {
          height: HEIGHT * 0.5,
          width: "100%",
        },
      }),
    },
    crossIconContainer: {
      position: "absolute",
      alignItems: "flex-end",
      top: -50,
      right: 0,
      zIndex: 10,
    },
    modalStyle: {
      alignItems: "center",
    },
  };
};

export default getStyles;
