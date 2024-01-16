import { StyleSheet } from "@unthinkable/react-core-components";

import getModalHeight, { maxModalHeight } from "../../utils/getModalHeight";

const styles = StyleSheet.create({
  notficationIconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconNotification: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  headerTextStyle: {
    paddingTop: 0,
    fontWeight: "600",
    paddingBottom: 16,
  },
  innerContainerStyle: {
    height: getModalHeight(),
    maxHeight: maxModalHeight,
  },
});

export default styles;
