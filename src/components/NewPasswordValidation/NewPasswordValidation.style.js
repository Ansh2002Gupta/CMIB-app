import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

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
    width: 6,
    height: 6,
    borderRadius: 5,
    margin: 5,
  },
  activityBulletStyle: (isValid) => ({
    backgroundColor: isValid ? colors.green : colors.lightGrey,
  }),
  customCommonTextStyle: {
    width: "100%",
  },
});

export default styles;
