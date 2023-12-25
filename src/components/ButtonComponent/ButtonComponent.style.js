import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const buttonStyleBase = {
  height: 56,
  backgroundColor: colors.green,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  borderRadius: 8,
};
const buttonStyleWeb = Platform.OS.toLowerCase() === "web" ? { cursor: 'pointer' } : {};
const style = {
  buttonStyle: {
    ...buttonStyleBase,
    ...buttonStyleWeb,
  },
  disableButtonStyle: {
    opacity: 0.5,
  },
  titleStyle: {
    fontSize: 16,
    color: colors.white,
    margin: 8,
    fontWeight: "600",
  },
};

export default style;



