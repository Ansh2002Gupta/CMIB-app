import colors from "../../assets/colors";
import { Platform } from "@unthinkable/react-core-components";

const style = {
  containerStyle: {
    marginTop:24,
    marginBottom:24,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  followUsText: {
    color: colors.black,
    fontSize: 14,
    alignSelf: "center",
    fontFamily:
      Platform.OS.toLowerCase() === "web"
        ? "General Sans"
        : "GeneralSans-Medium",
    justifyContent: "center",
    fontWeight: "600",
  },
  imageView: {
    flexDirection: "row",
    marginTop: 16,
  },
  imageStyle: {
    borderWidth: 0.5,
    borderColor: colors.black,
    padding: 4,
    borderRadius: 3,
    justifyContent: "center",
    marginLeft: 12,
    marginRight: 12,
  },
};
export default style;
