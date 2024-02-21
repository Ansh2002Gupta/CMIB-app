import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const baseMessageContainer = {
  padding: 16,
  borderWidth: 1,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  marginTop: 4,
  marginBottom: 4,
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

const baseAvatarSize = {
  height: 32,
  width: 32,
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
    marginTop: 10,
    flex: 1,
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
  avatarOuterContainer: {
    marginTop: 20,
    ...baseAvatarSize,
  },
  avatarContainer: {
    paddingTop: 0,
    overflow: "hidden",
    ...baseAvatarSize,
  },
  avatarContainerWithName: {
    marginTop: 20,
    paddingTop: 0,
    overflow: "hidden",
    ...baseAvatarSize,
  },
  avatar: {
    ...baseAvatarSize,
  },

  textSize: {
    fontSize: 14,
    flexWrap: "wrap",
  },
  shouldShowAvatarRecieverMessageArea: {
    alignItems: "flex-start",
    marginLeft: 40,
  },
  imagesSection: {
    height: 160,
    width: 200,
    objectFit: "cover",
    borderRadius: 12,
  },
});

export default styles;
