import { Platform } from "@unthinkable/react-core-components";

const getStyles = (theme) => {
  const { colors } = theme;

  return {
    customerInnerContainerStyle: {
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 0,
      paddingRight: 0,
    },
    headerSection: {
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 16,
      paddingTop: 0,
      borderBottomWidth: 1,
      borderColor: colors.lightGrey,
    },
    headerText: {
      fontSize: 16,
    },
    clearAll: {
      fontSize: 14,
    },
    leftSection: {
      width: "50%",
      borderRightWidth: 1,
      borderColor: colors.lightGrey,
    },
    rightSection: {
      width: "50%",
    },
    bottomSection: {
      width: "100%",
      borderTopWidth: 1,
      padding: 16,
      paddingBottom: 0,
      borderColor: colors.lightGrey,
    },
    buttonWebStyle: {
      alignItems: "flex-end",
    },
    subContainerStyle: {
      width: "50%",
    },
    buttonMobileStyle: {
      ...Platform.select({
        ios: {
          marginBottom: 30,
        },
      }),
    },
    datePickerModalView: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    datePickerStyle: {
      minWidth: 80,
      borderWidth: 2,
      width: 180,
      marginTop: 24,
    },
    datePickerInner: {
      top: 50,
      left: -30,
    },
    middleSectionWeb: {
      minHeight: 278,
    },
    middleSectionStyle: {
      height: 278,
    },
    arrowRight: {
      height: 16,
      width: 16,
      marginRight: 16,
    },
    renderCheckButton: {
      flexDirection: "row",
      paddingTop: 16,
      paddingLeft: 16,
      justifyContent: "center",
      width: "100%",
    },
    renderOptionCatigory: {
      height: 300,
    },
    slider: {
      flex: 1,
      marginTop: 38,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 12,
      paddingBottom: 12,
    },
    limitsContainer: {
      width: "100%",
      marginTop: 8,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    sliderLimitLabel: {
      color: colors.mediumGray,
      fontSize: 14,
    },
    popUp: {
      position: "absolute",
      top: 0,
      width: 32,
      height: 20,
    },
    customExperience: {
      fontSize: 14,
    },
    customExperienceContainer: {
      position: "relative",
      left: 8,
      bottom: 4,
    },
    alignflexStart: {
      alignItems: "flex-start",
    },
    slider: {
      flex: 1,
      marginTop: 38,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 12,
      paddingBottom: 12,
    },
    limitsContainer: {
      width: "100%",
      marginTop: 8,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    sliderLimitLabel: {
      color: colors.mediumGray,
      fontSize: 14,
    },
    popUp: {
      position: "absolute",
      top: 0,
      width: 32,
      height: 20,
    },
    customExperience: {
      fontSize: 14,
    },
    customExperienceContainer: {
      position: "relative",
      left: 8,
      bottom: 4,
    },
  };
};

export default getStyles;
