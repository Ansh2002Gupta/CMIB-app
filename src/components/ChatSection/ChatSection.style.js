import { Dimensions, StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const { height: HEIGHT } = Dimensions.get("window");

const ChatSection = StyleSheet.create({
  chatSection: {
    flex: 1,
    zIndex: 1,
  },
  messageSection: {
    maxheight: 722,
    height: HEIGHT * 0.5,
    overflowY: "scroll",
    paddingLeft: 16,
    paddingRight: 16,
  },
  inputSection: {
    paddingTop: 24,
  },
  cutomTextInput: {
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
  loadingStyle: {
    padding: 12,
    marginTop: 50,
    alignItems: "center",
  },
  customTextInputOuterContainer: {
    borderRadius: 12,
    paddingRight: 0,
  },
});

export default ChatSection;
