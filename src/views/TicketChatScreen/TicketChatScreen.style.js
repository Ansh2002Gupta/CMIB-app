import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundGrey,
  },
  chatScreenSectionWeb: (midOrSmall) => ({
    position: "relative",
    paddingTop: 30,
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
    zIndex: 1,
  },
  bottomSectionStyle: {
    zIndex: 0,
  },
  PopupMessageStyle: {
    backgroundColor: colors.white,
    position: "absolute",
    right: 16,
    top: -10,
    zIndex: 10,
    padding: 16,
  },
});

export default styles;
