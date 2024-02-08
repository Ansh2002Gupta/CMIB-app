import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

const style = StyleSheet.create({
  componentStyle: {
    marginTop: 24,
    flexDirection: "row",
    paddingBottom: 24,
    width: "100%",
    ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
  },
  containerStyle: {
    backgroundColor: colors.backgroundColor,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.subHeadingGray,
    marginTop: 8,
  },
  imageStyle: {
    height: 24,
    width: 24,
  },
  imageContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.secondaryGrey,
  },
  mainStyle: {
    flex: 1,
  },
  mobContainer: {
    flex: 1,
  },
  textView: {
    paddingTop: 16,
  },
  titleText: {
    fontSize: 18,
    color: colors.black,
  },
  webComponentStyle: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    height: 236,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: "flex-end",
  },
  webContainerStyle: {
    flexDirection: "row",
    gap: 24,
    width: "100%",
    backgroundColor: colors.backgroundColor,
    paddingLeft: 24,
    paddingRight: 24,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
});

export default style;
