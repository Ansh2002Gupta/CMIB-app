import {
  StyleSheet,
  Dimensions,
  Platform,
} from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const { height: HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundGrey,
  },
  chatScreenSectionWeb: {
    position: "relative",
    paddingTop: 64,
    paddingLeft: 80,
    paddingRight: 80,
    width: "80%",
  },
  chatScreenSection: {
    position: "relative",
    // paddingTop: 64,
    // paddingLeft: 80,
    // paddingRight: 80,
    width: "100%",
  },
  ticketDetailsStyles: {
    width: "20%",
  },
  messageSection: {
    maxheight: 722,
    height: HEIGHT * 0.5,
    overflowY: "scroll",
    // justifyContent: "flex-end",
  },
  inputSection: {
    paddingTop: 24,
    // backgroundColor: "green",
  },
  ticketDetails: {
    backgroundColor: colors.white,
  },
});

export default styles;
