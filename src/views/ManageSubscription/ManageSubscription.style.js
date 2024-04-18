import { StyleSheet, Dimensions } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    width: "100%",
  },
  headingTextContainer: {
    marginBottom: 16,
    paddingTop: 32,
  },
  headingText: {
    fontSize: 28,
    color: colors.black,
    marginLeft: 8,
  },
  subHeadingText: {
    fontSize: 16,
    color: colors.darkGrey,
    lineHeight: 20,
    marginLeft: 8,
    marginTop: 32,
  },
  pointersButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  pointersButtonContainerMob: {
    flexDirection: "column",
  },
  pointerMainContainer: {
    marginBottom: 24,
  },
  viewPackagesButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.green,
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 32,
    paddingRight: 32,
  },
  pointersContainer: {
    paddingLeft: 4,
    marginTop: 16,
    // paddingRight: 16,
  },
  tickIcon: {
    marginRight: 8,
    height: 24,
    width: 24,
  },
  arrowDown: {
    height: 16,
    width: 20,
  },
  viewPackageText: {
    fontSize: 16,
    color: colors.backgroundColor,
  },
  subscribeButtontext: {
    fontSize: 14,
    color: colors.backgroundColor,
  },
  pointersText: {
    fontSize: 16,
    color: colors.black,
    flexWrap: "wrap",
    width: WIDTH * 0.8,
  },
  pointersTextWeb: {
    fontSize: 16,
    color: colors.black,
    flexWrap: "wrap",
  },
  pointersTextContainer: {
    flexWrap: "wrap",
    // lineBreak: "normal",
  },
  // purchased package styles

  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginTop: 16,
    marginBottom: 16,
  },
  currentPackageText: {
    fontSize: 16,
    color: colors.darkGrey,
    lineHeight: 24,
    marginBottom: 16,
  },
  packageNameText: {
    fontSize: 24,
    color: colors.black,
  },
  packagePriceText: {
    fontSize: 32,
    color: colors.black,
    lineHeight: 44,
  },
  packageValidityText: {
    fontSize: 16,
    color: colors.black,
  },
  packageDescriptionText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    flexWrap: "wrap",
    marginTop: 16,
    marginBottom: 16,
  },
  loaderStyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
});

export default styles;
