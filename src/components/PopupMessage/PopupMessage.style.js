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
  zIndex10: {
    zIndex: 10,
  },
  containerStyle: {
    flexDirection: "row",
    height: 20,
    width: 20,
  },
  popUpArrayView: {
    position: "absolute",
    right: 8,
    top: 0,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
    maxHeight: 150,
    zIndex: 10,
  },
  deletetext: {
    fontSize: 14,
  },
  popUpComponentStyle: {
    backgroundColor: colors.white,
    zIndex: 10,
    padding: 16,
    width: 240,
    height: 54,
    borderColor: colors.lightGrey,
    borderRadius: 8,
  },
});

export default styles;
