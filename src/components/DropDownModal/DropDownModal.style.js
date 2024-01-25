import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  optionsText: {
    fontSize: 14,
  },
  optionContainer: {
    padding: 16,
    borderBottomWidth: 0.2,
    borderColor: colors.lightGrey,
  },
  valueText: {
    fontSize: 14,
  },
  textButton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 14,
    marginTop: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.lightGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    alignItems: "center",
  },
  iconArrow: {
    marginLeft: 6,
    height: 16,
    width: 16,
  },
  placeHolderText: {
    color: colors.darkGrey,
    fontSize: 14,
  },
  selectedOption: {
    color: colors.green,
    fontSize: 14,
    fontWeight: "600",
  },
  modalInnerContainer: {
    maxHeight: 588,
    minHeight: 320,
  },
  headerText: {
    marginBottom: 16,
  },
  optionMainContainer: { marginTop: 8 },
  nothingFoundText: {
    alignItems: "center",
    padding: 16,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  prefixContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  prefixStyle: {
    marginLeft: 5,
    marginRight: 5,
  },
});

export default styles;
