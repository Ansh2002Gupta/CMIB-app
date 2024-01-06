import { StyleSheet} from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles =StyleSheet.create({
  counterMainView: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  counterView: {
    justifyContent: "center",
  },
  counterInputText: {
    flex: 1,
    color: colors.black,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    padding: 0,
  },
  counterUp: {
    height: 14,
    width: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  counterDown: {
    marginTop: 2,
    height: 14,
    width: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMsg: {
    color: colors.errorRed,
    lineHeight: 18,
    fontWeight: "600",
  },
  img: {
    height: 14,
    width: 14,
  },
  arrowParent: { marginLeft: 8 },
});

export default styles;
