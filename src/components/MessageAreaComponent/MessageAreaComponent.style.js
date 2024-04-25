import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

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
        wordBreak: "break-word",
        whiteSpace: "break-spaces",
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

  return {
    smSenderMessageStyle: {
      maxWidth: 300,
      ...baseSenderStyle,
      ...baseMessageContainer,
    },
    senderMessageStyle: {
      maxWidth: "40vw",
      ...baseSenderStyle,
      ...baseMessageContainer,
    },
    recieverMessageStyle: {
      maxWidth: "40vw",
      ...baseRecieverStyle,
      ...baseMessageContainer,
    },
    smRecieverMessageStyle: {
      maxWidth: 300,
      ...baseRecieverStyle,
      ...baseMessageContainer,
    },
    textSize: {
      fontSize: 14,
      flexWrap: "wrap",
    },
  };
};

export default getStyles;
