import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  toolbarStyle: {
    backgroundColor: colors.lightGray,
  },
  labelContainer: {
    flexDirection: "row",
    fontFamily: "General Sans",
    gap: 4,
  },
  label: {
    color: colors.darkGrey,
  },
  webLabel: {
    fontFamily: "General Sans",
    color: colors.black,
  },
  starStyle: {
    color: colors.errorRed,
  },
  mainView: {
    borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 16,
    borderColor: colors.lightGray,
    marginTop: 4,
  },
  componentView: {
    marginLeft: 24,
    marginRight: 24,
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
