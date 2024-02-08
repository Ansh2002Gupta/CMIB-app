import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  deletetextContainer: {
    backgroundColor: colors.white,
    position: "absolute",
    right: 16,
    top: 90,
    zIndex: 10,
    padding: 16,
    width: 240,
    height: 54,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
  },
  deletetext: {
    fontSize: 14,
  },
});

export default styles;
