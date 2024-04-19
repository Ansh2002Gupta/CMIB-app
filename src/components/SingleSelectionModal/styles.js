import { Dimensions, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const deviceHeight = Dimensions.get("window").height;

const styles = {
  activeButtonStyle: {
    borderColor: colors.green,
  },

  activeButtonViewStyle: {
    backgroundColor: colors.green,
  },

  buttonViewStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "transparent",
  },
  centersDataItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 12,
  },

  modalInnerContainer: {
    ...Platform.select({
      ios: {
        maxHeight: deviceHeight / 1.5,
      },
      android: {
        maxHeight: deviceHeight * 0.65,
      },
      web: {
        height: deviceHeight * 0.5,
      },
    }),
  },

  yesButtonStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
  },
  noButtonStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 18,
    color: colors.black,
    fontWeight: "500",
  },
  flexCenterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.black,
    fontWeight: "600",
  },
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
export default styles;
