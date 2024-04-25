const getStyles = (theme) => {
  const { colors } = theme;

  return {
    headerTextStyle: {
      color: colors.black,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "600",
    },
    sectionHeaderTextStyle: {
      color: colors.black,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    descriptionContentStyle: {},
    bulletDot: {
      height: 5,
      width: 5,
      borderRadius: 5 / 2,
      backgroundColor: colors.black,
      marginRight: 8,
      marginLeft: 8,
    },
    pointsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    descrptionTextStyle: {
      marginTop: 16,
    },
    contentContainer: {
      marginTop: 16,
    },
    quilStyle: { height: "auto", borderWidth: 0 },
    quillContainerStyle: { borderWidth: 0 },
  };
};

export default getStyles;
