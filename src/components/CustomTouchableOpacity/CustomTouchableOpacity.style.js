import { StyleSheet, Platform } from "@unthinkable/react-core-components";

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    ...(Platform.OS.toLowerCase() === "web" ? { cursor: "pointer" } : {}),
  },
  disabledButton: {
    ...(Platform.OS.toLowerCase() === "web" ? { cursor: "not-allowed" } : {}),
  },
});

export default styles;
