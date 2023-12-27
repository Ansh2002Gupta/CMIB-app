import { Platform } from "@unthinkable/react-core-components";
const styles = {
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    ...(Platform.OS.toLowerCase() === 'web' ? { cursor: 'pointer' } : {}),
  }
};

export default styles;
