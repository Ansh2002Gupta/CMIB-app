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
  },
  profileView: {
    flexDirection: "row",
    marginLeft: 10,
    position: "relative",
  },
  profileNameSection: {
    flexDirection: "row",
    alignItems:"center"
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
