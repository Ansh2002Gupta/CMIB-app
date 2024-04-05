import { Platform, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  container: {
    minHeight: 437,
    maxHeight: Platform.OS == "web" ? " 50vh" : 700,
    overflow: Platform.OS == "web" ? "auto" : "visible",
  },
  mobileButtonStyle: {
    marginBottom: 24,
    height: 60,
    backgroundColor: colors.secondaryGrey,
    justifyContent: "flex-start",
  },
  buttonStyle: {
    marginBottom: 24,
    height: 44,
  },
  flexOne: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: 24,
  },
  questionHeading: {
    fontSize: 20,
  },
  marginTop: {
    marginTop: 16,
  },
  margintTop24: {
    marginTop: 24,
  },
  addButtonStyle: {
    flex: 1,
    marginLeft: 16,
  },
  get buttonTextStyle() {
    return (isWebview) => ({
      color: isWebview ? colors.black : colors.darkBlue,
    });
  },
  bottomButtomView: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  mandatoryViewStyle: {
    marginLeft: 8,
  },
  mandtoryTextStyle: {
    fontSize: 14,
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 24,
    width: "100%",
    marginBottom: 24,
  },
});
export default styles;
