import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
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
  closeText: {
    color: "white",
    fontSize: 18,
  },
  transformerImageWrapper: {
    backgroundColor: "transparent",
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    alignItems: "center",
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
    top: 50,
    right: 10,
  },
  previewImage: {
    ...Platform.select({
      web: {
        maxHeight: "60vh",
        maxWidth: "80vw",
      },
    }),
  },
  modalStyle: {
    alignItems: "center",
  },
});

export default styles;
