import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  counterMainView: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 9,
    marginTop: 4,
    paddingBottom: 9,
  },
  counterView: {
    justifyContent: "center",
  },
  counterInputText: {
    color: colors.black,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    padding: 0,
    height: 30,
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
  },
  img: {
    height: 14,
    width: 14,
  },
  arrowParent: { marginLeft: 8 },
});

export default styles;
