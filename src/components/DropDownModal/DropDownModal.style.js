import { Dimensions, Platform } from "@unthinkable/react-core-components";

const deviceHeight = Dimensions.get("window").height;

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    optionsText: {
      fontSize: 14,
      marginLeft: 12,
    },
    optionContainer: {
      padding: 16,
      borderBottomWidth: 0.2,
      borderColor: colors.lightGrey,
      flexDirection: "row",
      height: 52,
    },
    valueText: {
      fontSize: 14,
    },
    textButton: (isEditable) => ({
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 14,
      paddingBottom: 14,
      marginTop: 4,
      backgroundColor: isEditable
        ? colors.white
        : colors.disabledTextFieldColor,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colors.lightGrey,
      flexDirection: "row",
      justifyContent: "space-between",
      height: 48,
      alignItems: "center",
    }),
    iconArrow: {
      marginLeft: 6,
      height: 16,
      width: 16,
    },
    placeHolderText: {
      color: colors.darkGrey,
      fontSize: 14,
    },
    selectedOption: {
      color: colors.green,
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 12,
    },
    modalInnerContainer: {
      ...Platform.select({
        ios: {
          maxHeight: deviceHeight / 1.5,
        },
        android: {
          maxHeight: deviceHeight / 2,
        },
      }),
    },
    headerText: {
      marginBottom: 16,
    },
    nothingFoundText: {
      alignItems: "center",
      padding: 16,
    },
    iconStyle: {
      height: 20,
      width: 20,
    },
    prefixContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    prefixStyle: {
      marginLeft: 5,
      marginRight: 5,
    },
    searchView: {
      marginBottom: 8,
    },
    multiSelectOptions: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    multiSelectOptionStyle: {
      paddingLeft: 10,
      paddingTop: 10,
    },
    multiSelectOptionStyleDisabled: {
      opacity: 0.5,
    },
    modalContainer: {
      marginBottom: 30,
    },
    customContainerStyle: {
      flex: 1,
    },
  };
};

export default getStyles;
