import { Platform } from "@unthinkable/react-core-components";

const style = {
  contentContainerStyle: {
    flexDirection: "row",
    ...(Platform.OS.toLowerCase() === 'web' ? { cursor: 'pointer' } : {}),
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  titleStyle: {
    marginLeft: 8,
    marginBottom: 16,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
};

export default style;
