import { Platform } from "@unthinkable/react-core-components";

const style = {
  iconStyle: { height: 20, width: 20 },
  titleStyle: {
    marginLeft: 8,
    marginBottom: 16,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General Sans"
        : "GeneralSans-Medium",
  },
  contentContainerStyle: { flexDirection: "row", cursor: "pointer" },
};

export default style;
