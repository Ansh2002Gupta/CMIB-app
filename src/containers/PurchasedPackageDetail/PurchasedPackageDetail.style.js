import {
    StyleSheet,
  } from "@unthinkable/react-core-components";
  
  import colors from "../../assets/colors";
  
  
  const styles = StyleSheet.create({
    container: {
       marginTop: 24,
    },
    borderStyle: {
      borderWidth: 1,
      borderColor: colors.lightGrey,
      marginTop: 16,
      marginBottom: 16,
    },
    currentPackageText: {
      fontSize: 16,
      color: colors.darkGrey,
      lineHeight: 24,
      marginBottom: 16,
    },
    packageNameText: {
      fontSize: 24,
      color: colors.black,
    },
    packagePriceText: {
      fontSize: 32,
      color: colors.black,
      lineHeight: 44,
    },
    packageValidityText: {
      fontSize: 16,
      color: colors.black,
    },
    packageDescriptionText: {
      fontSize: 14,
      color: colors.black,
      lineHeight: 20,
      flexWrap: 'wrap',
      marginTop: 16,
      marginBottom: 16,
    }
  });
  
  export default styles;