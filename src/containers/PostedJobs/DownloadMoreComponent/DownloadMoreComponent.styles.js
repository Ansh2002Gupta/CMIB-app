import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: colors.lightGrey,
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    marginLeft: 4,
  },
  mobileContainer: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
    height: 44,
    justifyContent: "center",
    marginLeft: 4,
    height: 44,
    width: 44,
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconstyle: {
    height: 20,
    width: 20,
  },
  marginLeft8: {
    marginLeft: 8,
  },
  fontSize14: {
    fontSize: 14,
  },
});
export default styles;
