import { Dimensions, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundGrey,
  },
  chatScreenSectionWeb: (midOrSmall) => ({
    position: "relative",
    paddingTop: midOrSmall ? 30 : 64,
    paddingLeft: midOrSmall ? 20 : 80,
    paddingRight: midOrSmall ? 20 : 80,
    width: midOrSmall ? "70%" : "75%",
  }),
  chatScreenSection: {
    position: "relative",
    width: "100%",
  },
  ticketDetailsStyles: (midOrSmall) => ({
    width: midOrSmall ? "30%" : "25%",
  }),
  topSectionStyle: {
    zIndex: 10,
  },
  bottomSectionStyle: {
    zIndex: 0,
  },
});

export default styles;
