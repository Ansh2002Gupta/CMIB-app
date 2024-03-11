import { Platform, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  quillContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 0.6,
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
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
    marginBottom: 8,
  },
  label: {
    color: colors.darkGrey,
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
});

export default styles;
