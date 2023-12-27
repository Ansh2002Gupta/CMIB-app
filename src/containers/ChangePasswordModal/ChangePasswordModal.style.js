import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  containerStyle: { paddingBottom: 24 },
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
  fourthSectionStyle: { paddingBottom: 16 },
};

export default style;
