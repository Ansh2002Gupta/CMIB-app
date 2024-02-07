import { Dimensions, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const { height: HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundGrey,
  },
  chatScreenSectionWeb: (midOrSmall) => ({
    position: "relative",
    paddingTop: midOrSmall ? 30 : 64,
    paddingLeft: midOrSmall ? 20 : 80,
    paddingRight: midOrSmall ? 20 : 80,
    width: midOrSmall ? "70%" : "80%",
  }),
  chatScreenSection: {
    position: "relative",
    width: "100%",
  },
  ticketDetailsStyles: (midOrSmall) => ({
    width: midOrSmall ? "30%" : "20%",
  }),
  messageSection: {
    maxheight: 722,
    height: HEIGHT * 0.5,
    overflowY: "scroll",
  },
  inputSection: {
    paddingTop: 24,
  },
  ticketDetails: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatSection: {
    flex: 1,
  },
  cutomTextInput: { paddingBottom: 24 },
});

export default styles;
