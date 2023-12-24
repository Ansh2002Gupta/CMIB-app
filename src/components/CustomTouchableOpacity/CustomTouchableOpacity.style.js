import { Platform } from "@unthinkable/react-core-components";
const styles = {
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    cursor: Platform.OS.toLowerCase() === "web" ? "pointer" : {},
  }
};

export default styles;
