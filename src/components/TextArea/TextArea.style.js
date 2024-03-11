import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import { fontFamily } from "../../theme/styles/commonStyles";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  inputContainer: {
    resize: "none",
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    padding: 16,
    marginTop: 4,
    borderRadius: 8,
    flexDirection: "row",
    outline: "none",
    fontFamily,
    fontSize: 14,
  },
  invalidInput: {
    borderColor: colors.errorRed,
  },
  inputStyle: {
    width: "100%",
    textAlignVertical: "top",
    ...Platform.select({
      ios: {
        paddingTop: 16,
        paddingBottom: 16,
      },
    }),
  },
});

export default styles;
