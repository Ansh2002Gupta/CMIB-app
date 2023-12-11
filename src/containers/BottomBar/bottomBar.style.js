import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";

const style = {
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
  },
  activeStyleDashboard: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 2,
    marginBottom: -1,
    marginLeft: 5,
  },
  activeStyleMyaccount: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 2,
    marginBottom: -1,
    marginRight: 5,
  },
  buttonStyle: {
    alignItems: "center",
    padding: 16,
  },
  sectionViewStyle: { width: 48, height: 48, padding: 15 },
  imageStyle: { width: "100%", height: "100%" },
  sectionStyle: { flex: 1 },
};

export default style;
