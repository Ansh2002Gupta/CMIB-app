import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = {
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  clickable: {
    ...(Platform.OS.toLowerCase() === 'web' ? { cursor: 'pointer' } : {}),
  },
  disabled: {
    opacity: 0.5,
  },
  selected: {
    borderColor: colors.black,
    borderWidth: 1,
  },
};

export default styles;
