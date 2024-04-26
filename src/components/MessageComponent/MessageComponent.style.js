const baseAvatarSize = {
  height: 32,
  width: 32,
};

const getStyles = (theme) => {
  const { colors } = theme;

  return {
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
      borderColor: colors.lightGrey,
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 12,
    },
  };
};

export default getStyles;
