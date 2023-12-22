import { Platform } from "@unthinkable/react-core-components";

const styles = {
  button: {
    cursor: Platform.OS.toLowerCase() === "web" ? "pointer" : {},
  },
};

export default styles;
