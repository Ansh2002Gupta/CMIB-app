import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  imageParentStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    height: 44,
    borderRadius: 8,
    marginLeft: 16,
    paddingLeft: 12,
    paddingRight: 12,
  },
  customCellStyle: {
    justifyContent: "flex-start",
    padding: 14,
    backgroundColor: colors.secondaryGrey,
    borderColor: colors.secondaryGrey,
  },
  headingText: {
    fontSize: 28,
    color: colors.black,
    lineHeight: 20,
    marginLeft: 8,
  },
  subHeadingText: {
    fontSize: 16,
    color: colors.darkGrey,
    lineHeight: 20,
    marginLeft: 8,
    marginTop: 32,
  },
  headingTextContainer: {
    marginBottom: 16,
    marginTop: 32
  },
  pointersButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  viewPackagesButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.green,
    paddingTop: 17,
    paddingBottom: 17,
    paddingLeft: 32,
    paddingRight: 32,
  },
  subscribePackagesButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.green,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
  subscribeButtonContainer: {
    justifyContent: 'space-between',
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
  priceText: {
    fontSize: 32,
    lineHeight: 44,
    color: colors.black,
  },
  tickIcon: {
    paddingRight: 8,
  },
  pointersText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
  },
  pointersContainer: {
    paddingLeft: 4,
    marginTop: 16,
  },
  webComponentStyle: {
    flexDirection: "column",
    padding: 16,
    maxWidth: 300,
  },
  webContainerStyle: {
    backgroundColor: colors.backgroundColor,
    paddingLeft: 16,
    paddingRight: 16,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  buttonStyle: {
  },
  containerStyle: {
    backgroundColor: colors.backgroundColor,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
  },
  addApplicationView: {
  },
  webAddApplicationView: {
    textOverFlow: "ellipsis",
    overFlow: 'hidden',
  },
  addApplicationFormText: {
    fontSize: 24,
    color: colors.black,
  },
  componentStyle: {
    marginTop: 24,
    flexDirection: "row",
    ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
  },
  addApplicationFormDescriptionText: {
    fontSize: 16,
    color: colors.black,
    marginTop: 4,
    textOverFlow: 'elipsis'
  },
  descriptionText: {
    fontSize: 14,
    color: colors.black,
    marginTop: 16,
  },
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginTop: 16,
    marginBottom: 16,
  },
  webView: {
    inputLabelText: {
      color: colors.black,
      fontSize: 14,
      lineHeight: 24,
      textTransform: "capitalize",
    },
    inputTextBox: {
      background: colors.white,
      marginTop: 0,
    },
  },
});

export default styles;
