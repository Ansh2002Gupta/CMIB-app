import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";
const style = {
  borderStyle: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginLeft: -16,
    marginRight: -16,
  },
  activeStyle: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 2,
    marginBottom: -1,
  },
  activeStyleDashboard: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 2,
    marginBottom: -1,
    marginLeft: 10,
  },
  activeStyleMyaccount: {
    borderColor: colors.darkBlue,
    borderBottomWidth: 2,
    marginBottom: -1,
    marginRight: 10,
  },
  inActiveStyle: {
    borderColor: colors.white,
    borderBottomWidth: 1,
  },
  inActiveTextStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.darkGrey,
  },
  activeTextStyle: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.darkBlue,
  },
  buttonStyle: {
    alignItems: "center",
    padding: 16,
  },
  sectionViewStyle: { width: 48, height: 48, padding: 15 },
  imageStyle: { width: "100%", height: "100%" },
};

export default style;
