import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../../../assets/colors";

const stylesForMobile = StyleSheet.create({
  mobileViewContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: colors.lightGrey,
  },
  innerContainer: {
    flexDirection: "row",
    paddingBottom: 16,
  },
  fonstSize14: {
    fontSize: 14,
  },
  marginLeft4: {
    marginLeft: 4,
  },
  editIconStyle: {
    height: 24,
    width: 24,
    marginLeft: 30,
  },
  redCrossIconStyle: {
    marginLeft: 28,
    height: 16,
    width: 16,
  },
  crossIconStyle: {
    marginLeft: 30,
    height: 24,
    width: 24,
  },
  secondaryContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    paddingTop: 16,
    borderColor: colors.lightGrey,
  },
  addOptionStyle: {
    width: "100%",
    justifyContent: "flex-start",
    height: 60,
    backgroundColor: colors.secondaryGrey,
    justifyContent: "flex-start",
  },
});
export default stylesForMobile;
