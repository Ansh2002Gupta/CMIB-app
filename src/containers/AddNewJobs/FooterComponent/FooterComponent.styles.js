import { StyleSheet } from "@unthinkable/react-core-components";

const styles = StyleSheet.create({
  get containerStyle() {
    return (isWebView) => ({
      marginTop: 24,
      flexDirection: isWebView ? "row" : "column",
      alignItems: "center",
      flex: 1,
    });
  },
  firstViewStyles: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkBoxViewStyle: {
    justifyContent: "flex-start",
    flex: 1,
  },
  buttonViewStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  get cancelButtonStyle() {
    return (isWebView) => ({
      flex: 1,
      marginRight: 12,
      height: isWebView ? 44 : 60,
    });
  },
  get postButtonStyle() {
    return (isWebView) => ({
      flex: 1,
      marginLeft: 12,
      height: isWebView ? 44 : 60,
    });
  },
  emailDisableTextStyle: {
    fontSize: 14,
    fontFamily: "General Sans",
  },
  get getSecondViewStyle() {
    return (isWebView) => ({
      flex: 0.25,
      marginTop: isWebView ? 0 : 24,
    });
  },
});
export default styles;
