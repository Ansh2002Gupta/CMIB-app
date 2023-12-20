import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  errorText: {
    fontSize: 14,
    color: colors.errorRed,
  },
  passwordMatchStyle: {
    fontSize: 14,
    color: colors.errorRed,
    bottom: 16,
  },
  saveAndCancelButtonView: {
    paddingBottom: 21,
    paddingTop: 24,
  },
  customContainerStyle: {
    bottom: Platform.OS === "android" ? 0 : 16,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
};

export default style;
