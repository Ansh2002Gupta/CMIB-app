import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  quillContainer: {
    marginBottom: 60,
  },
  quillStyling: {
    height: "508px",
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  toolbarStyle: {
    backgroundColor: colors.lightGray,
  },
  labelContainer: {
    flexDirection: "row",
  },
  label: {
    color: colors.darkGrey,
    marginBottom: 4,
  },
  starStyle: {
    color: colors.errorRed,
    marginLeft: 8,
  },
  mainView: {
    borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 16,
    borderColor: colors.lightGray,
    marginTop: 4,
  },
  invalidInput: {
    borderColor: colors.red,
  },
  formatOptionStyle: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
  },
  formatOptionTextStyle: {
    alignSelf: "center",
    padding: 8,
    backgroundColor: colors.secondaryGrey,
  },
  activeFormatOptionTextStyle: {
    alignSelf: "center",
    padding: 8,
    backgroundColor: colors.black,
    color: colors.white,
  },
  headingStyle: {
    fontSize: 18,
    color: colors.gray,
  },
  errorMsg: {
    color: colors.errorRed,
    lineHeight: 18,
  },
  customButtonTextStyle: {
    fontSize: 14,
    color: colors.black,
    fontWeight: "600",
  },
  buttonStyle: {
    borderWidth: 0,
    padding: 0,
    justifyContent: "flex-end",
  },
});

export default styles;
