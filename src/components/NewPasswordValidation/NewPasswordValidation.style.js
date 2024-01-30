import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const bulletIconStyle = {
  width: 6,
  height: 6,
  borderRadius: 5,
  margin: 5,
};

const styles = StyleSheet.create({
  bulletText: {
    fontSize: 14,
    color: colors.gray,
  },
  validationText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 22,
  },
  validationView: {
    flexDirection: "row",
    marginTop: 8,
  },
  bulletIconStyle: {
    ...bulletIconStyle,
  },
  activityBulletStyle: (isValid) => ({
    backgroundColor: isValid ? colors.green : colors.red,
  }),
  customCommonTextStyle: {
    width: "100%",
  },
  handleBulletColor: {
    backgroundColor: colors.lightGrey,
    ...bulletIconStyle,
  },
});

export default styles;
