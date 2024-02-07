import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 8,
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    padding: 14,
    flex: 1,
  },
  hideRawInputField: {
    display: "none",
  },
});

export default styles;
