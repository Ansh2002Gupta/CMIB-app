import { StyleSheet } from "@unthinkable/react-core-components";
import { fontFamily } from "../../theme/styles/commonStyles";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  dropdownContainer: {
    padding: 14,
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 4,
  },
  control: (isFocused) => ({
    borderWidth: isFocused ? 0 : 1,
    marginTop: 4,
    borderRadius: 12,
    padding: 6,
    fontSize: 14,
    fontFamily,
  }),
  valueStyle: {
    color: colors.black,
  },
});

export default styles;
