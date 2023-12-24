import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  main: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  componentView: {
    padding: 24,
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  componentStyle: {
    flexDirection: "row",
    paddingBottom: 24,
    ...(Platform.OS.toLowerCase() === 'web' ? { cursor: 'pointer' } : {}),
  },
  webComponentStyle: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
  },
  webActiveComponentStyle: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: colors.green,
  },
  webContainerStyle: {
    flexDirection: "row",
    gap: 24,
    width: "100%",
  },
  addApplicationView: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  addApplicationFormText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "600",
  },
  addApplicationFormDescriptionText: {
    fontSize: 14,
    color: colors.subHeadingGray,
    fontWeight: "500",
    marginTop: 8,
  },
  containerStyle: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.backgroundColor,
    marginBottom: 16,
  },
  webAddApplicationView: {
    paddingLeft: 0,
    paddingTop: 16,
  },
  webHeaderTextStyle: {
    fontSize: 32,
    color: colors.black,
    fontWeight: "600",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  headerTextStyle: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "600",
  },
  buttonStyle: { flex: 1 },
  imageStyle: { maxWidth: 40 },
};

export default style;
