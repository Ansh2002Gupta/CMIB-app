import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const baseMessageContainer = {
  padding: 16,
  borderWidth: 1,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  marginTop: 4,
  ...Platform.select({
    web: {
      overflowWrap: "break-word",
    },
  }),
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
    marginTop: 10,
    flex: 1,
  },
  recieverContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 10,
  },
  senderMessageArea: {
    alignItems: "flex-end",
    marginRight: 8,
    flexWrap: "wrap",
  },
  shouldShowAvatarSenderMessageArea: {
    alignItems: "flex-end",
    marginRight: 40,
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
    flexWrap: "wrap",
    // flex: 1,
  },
});

export default styles;
