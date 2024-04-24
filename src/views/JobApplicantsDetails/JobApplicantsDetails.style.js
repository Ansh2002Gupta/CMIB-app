import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    paddingTop: 24,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    marginBottom: 16,
  },
  keyHeading: {
    fontSize: 14,
    color: colors.darkGrey,
  },
  valueStyle: {
    fontSize: 14,
    lineHeight: 22,
    flexWrap: "wrap",
  },
  savedButtonContainer: {
    backgroundColor: colors.secondaryGrey,
    borderWidth: 0,
    opacity: 1,
    cursor: "not-allowed",
  },
  shortProfile: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  userInfoContainer: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoContainerMob: {
    padding: 5,
    marginRight: 10,
    flexDirection: "column",
  },
  detailsSection: {
    marginBottom: 20,
  },
  seperator: {
    height: 20,
    width: 1,
    marginRight: 16,
    marginLeft: 16,
    backgroundColor: colors.lightGrey,
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  MobButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  greenButtonText: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 22,
    flexWrap: "wrap",
    overFlow: "hidden",
    whiteSpace: "break-space",
  },
  greenButton: {
    marginLeft: 24,
  },
});

export default styles;
