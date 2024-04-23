import {
    StyleSheet,
    Platform,
    Dimensions,
  } from "@unthinkable/react-core-components";
  
  import colors from "../../assets/colors";
  
  const { height: HEIGHT } = Dimensions.get("window");
  
  const styles = StyleSheet.create({
    modalWebViewContainer: {
      ...Platform.select({
        ios: {
          height: HEIGHT,
        },
        android: {
          height: HEIGHT,
        },
      }),
    },
    viewPackageText: {
      fontSize: 16,
      color: colors.backgroundColor,
    },
    viewPackageTextMob: {
      fontSize: 16,
      color: colors.green,
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
  
    subscribePackagesButtonMob: {
      alignItems: "center",
      justifyContent: "center",
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
  