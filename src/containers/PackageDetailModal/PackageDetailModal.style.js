import {
    StyleSheet,
    Platform,
    Dimensions,
  } from "@unthinkable/react-core-components";
  
  import colors from "../../assets/colors";
  
  const { height: HEIGHT } = Dimensions.get("window");
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
    },
    header: {
      fontSize: 24,
      marginBottom: 24,
      textAlign: "center",
    },
    imageParentStyle: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      backgroundColor: colors.white,
      height: 44,
      borderRadius: 8,
      marginLeft: 16,
      paddingLeft: 12,
      paddingRight: 12,
    },
    customCellStyle: {
      justifyContent: "flex-start",
      padding: 14,
      backgroundColor: colors.secondaryGrey,
      borderColor: colors.secondaryGrey,
    },
  
    webComponentStyle: {
      flexDirection: "column",
      padding: 16,
    },
    webContainerStyle: {
      backgroundColor: colors.backgroundGrey,
      paddingLeft: 16,
      paddingRight: 16,
      gap: 24,
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    buttonStyle: {},
    containerStyle: {
      backgroundColor: colors.backgroundColor,
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 16,
    },
    addApplicationView: {},
    webAddApplicationView: {
      textOverFlow: "ellipsis",
      overFlow: "hidden",
    },
    addApplicationFormText: {
      fontSize: 24,
      color: colors.black,
      flexWrap: "wrap",
      overFlow: "hidden",
      whiteSpace: "break-space",
    },
    componentStyle: {
      marginTop: 24,
      flexDirection: "row",
    },
    addApplicationFormDescriptionText: {
      fontSize: 16,
      color: colors.black,
      marginTop: 4,
    },
    descriptionText: {
      fontSize: 14,
      color: colors.black,
      marginTop: 16,
      // flexWrap: "wrap",
      // wordBreak: "break-word",
      // overFlow: "hidden",
      // whiteSpace: "break-space",
      display: 'flex',
      flexDirection: 'row',
      // alignItems: 'flex-end',
      // justifyContent: 'space-between',
    },
    customButtonTextStyle: {
      fontSize: 14,
      color: colors.black,
      fontWeight: "600",
    },
    borderStyle: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      marginTop: 16,
      marginBottom: 16,
    },
    modalInnerContainer: {
      ...Platform.select({
        ios: {
          maxHeight: HEIGHT / 1.5,
        },
        android: {
          maxHeight: HEIGHT * 0.65,
        },
      }),
    },
    viewPackageText: {
      fontSize: 16,
      color: colors.backgroundColor,
    },
    subscribePackagesButton: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: colors.green,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 16,
      paddingRight: 16,
    },
    subscribeButtonContainer: {
      justifyContent: "space-between",
    },
    priceText: {
      fontSize: 32,
      lineHeight: 44,
      color: colors.black,
    },
  });
  
  export default styles;
  