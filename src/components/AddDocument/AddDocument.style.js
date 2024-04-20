import {
  Dimensions,
  Platform,
  StyleSheet,
} from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const screenHeight = Dimensions.get("window").height;
const maxHeight = screenHeight * 0.8;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  customCardComponentStyle: {
    marginTop: 16,
    backgroundColor: colors.secondaryGrey,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  MultiRowPhoneStyle: {
    backgroundColor: colors.backgroundColor,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  addDesignationTextStyle: {
    fontSize: 14,
    color: colors.darkBlue,
    marginLeft: 8,
  },
  selectionProcessStyle: {
    fontSize: 16,
    color: colors.black,
  },
  checkBoxStyle: {
    marginTop: 16,
  },
  ctcTextInputStyle: {
    marginTop: 24,
  },
  containerGridStyle: (columnCount) => ({
    ...Platform.select({
      web: {
        display: "grid",
      },
    }),
    gridTemplateColumns: columnCount || "1fr 1fr 1fr",
  }),
  monthlyCustomCardStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
  yearlyCustomCardStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 24,
  },
  bondIfAnyText: {
    fontSize: 16,
  },
  customToggleStyle: {
    marginTop: 20,
    paddingBottom: 24,
  },
  selectionProcessTextStyle: {
    marginBottom: 8,
  },
  detailDocumentRequiredText: {
    fontSize: 16,
  },
  otherInformationTextStyle: {
    fontSize: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  leftSectionStyle: {
    flex: 3,
  },
  rightSectionStyle: {
    flex: 7,
  },
  addDesignationView: {
    marginLeft: 16,
    marginRight: 16,
  },
  companyRequireText: {
    color: colors.darkGrey,
  },
  companyRequireToggleStyle: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  multiRowTextStyle: {
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 16,
    overflow: "visible",
  },
  postingPlaceTextStyle: {
    fontSize: 14,
  },
  mandatoryTextStyle: {
    paddingTop: 16,
    paddingBottom: 24,
    fontSize: 14,
    color: colors.darkGrey,
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
  notBorderStyle: {
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  customAddIconTextStyle: {
    paddingBottom: 24,
    marginTop: 16,
  },
  documentNameInput: {
    marginTop: 20,
    paddingBottom: 24,
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  documentTypeInput: {
    paddingBottom: 24,
    width: "48%",
  },
  copiesInputStyle: {
    width: "48%",
  },
  customWebContainerStyle: {
    overflow: "visible",
  },
});

export default styles;
