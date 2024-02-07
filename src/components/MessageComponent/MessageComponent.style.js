import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const baseMessageContainer = {
  padding: 16,
  borderWidth: 1,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  marginTop: 4,
};

const baseSenderStyle = {
  backgroundColor: colors.backgroundSecondGrey,
  borderColor: colors.lightGrey,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 2,
};

const baseRecieverStyle = {
  backgroundColor: colors.white,
  borderColor: colors.lightGrey,
  borderTopLeftRadius: 2,
  borderTopRightRadius: 16,
};

const styles = StyleSheet.create({
  smSenderMessageStyle: {
    maxWidth: 311,
    ...baseSenderStyle,
    ...baseMessageContainer,
  },
  senderMessageStyle: {
    maxWidth: 680,
    ...baseSenderStyle,
    ...baseMessageContainer,
  },
  recieverMessageStyle: {
    maxWidth: 680,
    ...baseRecieverStyle,
    ...baseMessageContainer,
  },
  smRecieverMessageStyle: {
    maxWidth: 311,
    ...baseRecieverStyle,
    ...baseMessageContainer,
  },
  senderContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 10,
  },
  recieverContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 10,
  },
  senderMessageArea: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  reciverMessageArea: {
    alignItems: "flex-start",
    marginLeft: 8,
  },
  avatar: {
    marginTop: 20,
    height: 32,
    width: 32,
  },
  textSize: {
    fontSize: 14,
  },
});

export default styles;
