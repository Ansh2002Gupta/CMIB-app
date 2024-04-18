import { Dimensions, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const screenHeight = Dimensions.get("window").height;
const maxHeight = screenHeight * 0.8;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  bottomMargin: {
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  companyRequireToggleStyle: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  otherInformationTextStyle: {
    fontSize: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  postingPlaceTextStyle: {
    fontSize: 14,
  },
  postingPlaceView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    flexWrap: "wrap",
  },
  postingPlaceMapView: {
    width: "45%",
    marginBottom: 24,
  },
  multiRowTextStyle: {
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 16,
    flexDirection: "column",
  },
  customModalStyle: {
    rightButtonStyle: { marginLeft: 8 },
    leftButtonStyle: { marginRight: 8 },
    containerStyle: {
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      maxHeight: maxHeight,
    },
  },
  addDocumentViewStyle: {
    paddingBottom: 24,
  },
  documentBorderStyle: {
    borderTopWidth: 1,
    borderTopColor: colors.greyOne,
  },
  mandatoryTextStyle: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  customAddIconStyle: {
    marginTop: 16,
  },
  toggleLabelViewStyle: {
    width: "100%",
  },
  customWebContainerStyle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    overflowY: "auto",
  },
});

export default styles;
