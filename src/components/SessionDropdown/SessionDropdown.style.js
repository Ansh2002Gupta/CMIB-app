import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    position: "absolute",
    top: 20,
    right: 0,
  },
  modalContent: {
    backgroundColor: colors.white,
    width: 250,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  option: {
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  optionTextStyle: {
    fontSize: 12,
    marginLeft: 2,
    borderWidth: 0,
  },
});

export default styles;
