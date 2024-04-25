import { StyleSheet, Dimensions } from "@unthinkable/react-core-components";
import colors from "../../../../assets/colors";

const screenHeight = Dimensions.get("window").height;
const maxHeight = screenHeight * 0.5;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  cardStyle: {
    paddingRight: 0,
  },
  customContainerStyle: (windowWidth) => ({
    display: "flex",
    // overflow: "auto",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingRight: windowWidth > 1200 ? 0 : 24,
    maxWidth: windowWidth > 1200 ? "66%" : "100%",
  }),
  modalCardStyle: {
    borderWidth: 0,
  },
  tableStyle: {
    marginLeft: 16,
    marginRight: 16,
  },
  customWebContainerStyle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    overflowX: "auto",
  },
  customViewModeStyle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    overflowX: "auto",
  },
  actionBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingLeft: 24,
    paddingTop: 24,
    paddingBottom: 24,
    paddingRight: 24,
    backgroundColor: colors.backgroundColor,
  },
  buttonStyle: { maxHeight: 44, maxWidth: 80 },
  buttonTwoStyle: { maxHeight: 44, maxWidth: 150 },
  backButtonStyle: {
    fontSize: 14,
  },
  CardComponentStyle: {
    margin: 16,
  },
  saveAndNextButton: {
    width: 150,
    height: 44,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: 5,
  },
  loaderContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    margin: 12,
  },
  documentBorderStyle: {
    borderTopWidth: 1,
    borderTopColor: colors.greyOne,
  },
  ctcTextInputStyle: {
    maxHeight: maxHeight,
  },
  bottomMargin: {
    marginBottom: 16,
  },
  customAddIconStyle: {
    marginTop: 16,
  },
  mandatoryTextStyle: {
    paddingTop: 16,
    paddingBottom: 24,
  },
});

export default styles;
