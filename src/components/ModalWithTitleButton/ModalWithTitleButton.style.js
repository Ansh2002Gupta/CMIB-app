import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  leftButtonStyle: {
    backgroundColor: colors.white,
  },
  leftTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
  rightButtonStyle: {
    backgroundColor: colors.green,
  },
  rightButtonDisableStyle: {
    backgroundColor: colors.disabledGrey,
  },
  rightTextStyle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  bottomStyle: {
    ...Platform.select({
      ios: {
        marginBottom: 30,
      },
    }),
  },
});

export default styles;
