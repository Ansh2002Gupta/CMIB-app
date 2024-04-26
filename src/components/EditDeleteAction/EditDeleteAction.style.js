const getStyles = (theme) => {
  const { colors } = theme;

  return {
    mainView: {
      justifyContent: "space-between",
    },
    topTextStyle: {
      fontSize: 14,
    },
    bottomRightTextStyle: {
      fontSize: 12,
      marginLeft: 12,
      marginTop: 2,
      color: colors.darkGrey,
    },
    bottomLeftTextStyle: {
      fontSize: 12,
      marginTop: 2,
      color: colors.darkGrey,
    },
    rightSectionStyle: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 11,
      paddingBottom: 11,
    },
    iconEditStyle: {
      marginRight: 16,
      color: colors.darkBlue,
      height: 20,
      width: 20,
    },
    iconDeleteStyle: {
      color: colors.darkBlue,
      height: 20,
      width: 20,
    },
    leftSectionStyle: {
      paddingTop: 11,
      paddingBottom: 11,
    },
    catrgoryTextStyle: {
      marginLeft: 8,
      color: colors.darkBlue,
    },
    customContainerStyle: {
      flexWrap: undefined,
      wordBreak: undefined,
    },
    iconDownArrowStyle: {
      color: colors.darkBlue,
    },
    categoriesText: {
      color: colors.darkGrey,
      marginTop: 4,
    },
    categoryVisibleStyle: {
      flexDirection: "column",
      marginTop: 4,
    },
    textViewStyle: {
      flexDirection: "row",
    },
    middleDotView: {
      flexDirection: "row",
    },
    middleDotStyle: {
      width: 8,
      height: 8,
      backgroundColor: colors.lightGrey,
      borderRadius: 5,
      alignSelf: "center",
      marginLeft: 10,
    },
  };
};

export default getStyles;
