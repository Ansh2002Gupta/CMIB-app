const bulletIconStyle = {
  width: 8,
  height: 8,
  borderRadius: 5,
  margin: 5,
};

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    bulletText: {
      fontSize: 14,
      color: colors.gray,
    },
    validationText: {
      fontSize: 14,
      color: colors.black,
      lineHeight: 22,
    },
    validationView: {
      flexDirection: "row",
      marginTop: 8,
    },
    bulletIconStyle: {
      ...bulletIconStyle,
    },
    activityBulletStyle: (isValid) => ({
      backgroundColor: isValid ? colors.greenAccepted : colors.red,
    }),
    customCommonTextStyle: {
      width: "100%",
    },
    handleBulletColor: {
      backgroundColor: colors.lightGrey,
      ...bulletIconStyle,
    },
  };
};

export default getStyles;
