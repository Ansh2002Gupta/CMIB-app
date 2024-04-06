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
  },
  userInfoContainer: {
    padding: 5,
    flexDirection: "row",
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
    flexWrap: "wrap",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  MobButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  greenButtonText: {
    fontSize: 14,
    color: colors.white,
  },
  greenButton: {
    marginLeft: 24,
  },
});

export default styles;
