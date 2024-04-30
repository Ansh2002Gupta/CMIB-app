const getStyles = (theme) => {
  const { colors } = theme;

  return {
    main: {
      paddingTop: 24,
      paddingLeft: 24,
      paddingRight: 24,
      flex: 1,
    },
    cardContainer: {
      backgroundColor: colors.white,
      marginBottom: 16,
    },
    customToggleStyle: {
      marginTop: 20,
      marginBottom: 24,
      marginRight: 24,
    },
    gap: {
      marginTop: 24,
      marginBottom: 24,
      gap: 16,
    },
    gridView: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      marginTop: 24,
    },
    twoColumnSingleElement: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
    },
    oneTwoColumnSingleElement: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
    },
    threeColumnGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    currentStatusGridView: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      marginTop: 24,
    },
    hobbiesGridView: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      marginTop: 24,
      paddingBottom: 24,
    },
    extraStyle: {
      borderTopWidth: 1,
      borderColor: colors.lightGray,
      paddingTop: 24,
    },
    groupGridView: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      marginTop: 24,
    },
    groupTitleText: {
      fontSize: 14,
      color: colors.black,
    },
    mainContainer: {
      marginTop: 12,
    },
    textInputContainer: (isRightMargin) => ({
      marginRight: isRightMargin ? 16 : 0,
      marginBottom: 24,
    }),
    titleText: {
      fontSize: 16,
      color: colors.black,
    },
    //job preference
    chipContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    textInputContainerWithoutBottomMargin: (isRightMargin) => ({
      marginRight: isRightMargin ? 16 : 0,
    }),
  };
};

export default getStyles;
