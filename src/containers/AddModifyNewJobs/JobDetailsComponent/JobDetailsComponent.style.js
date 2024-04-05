import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  marginBottom24: {
    marginBottom: 24,
  },
  get flexDirectionRowColumn() {
    return (isWebView) => ({
      flexDirection: isWebView ? "row" : "column",
    });
  },
  customTextInputStyle: {
    flex: 1,
  },
  get customToggleContainerStyle() {
    return (isWebView) => ({
      marginTop: 6,
      flex: 2,
      marginLeft: isWebView ? 24 : 0,
      marginRight: isWebView ? 24 : 0,
    });
  },
  customToggleStyle: {
    marginTop: 23,
    marginBottom: 32,
  },
  customLabelStyle: {
    color: colors.darkGrey,
  },
});

export default styles;
