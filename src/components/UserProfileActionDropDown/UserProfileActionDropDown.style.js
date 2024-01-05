import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  profileContainer: {
    position: "relative",
    marginLeft: 10,
  },
  profileView: {
    flexDirection: "row",
  },
  profileNameSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullNameStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
  roleStyle: {
    paddingTop: 5,
    fontSize: 12,
    color: colors.subHeadingGray,
  },
  iconArrow: {
    width: 16,
    height: 16,
    paddingLeft: 16,
  },
});

export default styles;
