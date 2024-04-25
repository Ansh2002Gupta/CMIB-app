import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  stepperContainer: {
    backgroundColor: colors.white,
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.lightGrey,
    overflow: "hidden",
  },
  container: {
    backgroundColor: colors.white,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  headingContainer: {
    padding: 16,
    alignItems: "center",
  },
  headingtext: {
    color: colors.black,
    fontSize: 20,
  },
  headingtextWeb: {
    color: colors.black,
    fontSize: 32,
  },
  headingtextWebMobView: {
    color: colors.black,
    fontSize: 20,
  },
  headingContainerWeb: {
    paddingBottom: 24,
    paddingTop: 24,
  },
  mainContainerMob: {
    alignItems: "center",
    paddingBottom: 8,
  },
});

export default styles;
