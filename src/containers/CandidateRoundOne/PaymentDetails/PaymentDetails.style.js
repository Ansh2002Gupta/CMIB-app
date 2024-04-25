import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  mainContainer: {
    padding: 24,
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    padding: 24,
    borderRadius: 16,
    gap: 24,
  },

  customTextStyle: { color: colors.black, fontSize: 16, fontWeight: "600" },

  buttonStyle: {
    maxWidth: 150,
  },
});

export default styles;
