import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";
const styles = StyleSheet.create({
  buttonStyle: {
    maxHeight: 44,
    maxWidth: 92,
  },
  buttonText:{
    fontWeight: "500",
  },
  customButtonContainer: {
    marginBottom: Platform.OS === "web" ? 24 : 0,
    marginRight: 24,
    maxHeight: Platform.OS === "web" ? 44 : "auto",
    justifyContent: "flex-end",
  },
  headerContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
  headerText: (isWebView) => ({
    fontSize: isWebView ? 32 : 20,
  }),
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  row:{
    flexDirection: "row",
    marginLeft: 24,
    marginTop: 24,
  },
  spinner:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepperContainer:{
    marginTop: 24,
  },
  stepperText: {
    marginBottom: 16,
  },
  webHeaderContainer: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomColor: colors.lightGrey,
    borderTopColor: colors.lightGrey,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
});

export default styles;
