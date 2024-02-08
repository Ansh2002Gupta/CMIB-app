import { Dimensions, StyleSheet } from "@unthinkable/react-core-components";

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
});

export default ChatSection;
