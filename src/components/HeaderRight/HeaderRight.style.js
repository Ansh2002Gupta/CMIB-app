import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  notficationIconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconNotification: {
    width: 24,
    height: 24,
    cursor: "pointer",
  },
  profileView: {
    flexDirection: "row",
    marginLeft: 10,
    cursor: "pointer",
    position: "relative",
  },
  profileNameSection: {
    flexDirection: "row",
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
    paddingTop: 17,
  },
});

export default styles;
