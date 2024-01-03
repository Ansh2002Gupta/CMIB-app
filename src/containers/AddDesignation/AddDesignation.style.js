import { StyleSheet} from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  saveStyle: {
    backgroundColor: colors.green,
    marginLeft: 16,
  },
  gapBetween: { 
    marginBottom: 24,
  },
  gapTop: { 
    marginTop: 24,
  },
  rightButtonStyle: {
     marginLeft: 8 
  },
  rightButtonDisableStyle: {
    marginLeft: 8 ,
    backgroundColor: colors.voilet,
 },
  leftTextStyle: {
    fontSize: 14,
    fontWeight: "600",
  },
  rightTextStyle: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  webView: {
    inputLabelText: {
      color: colors.black,
      fontSize: 14,
      lineHeight: 24,
      textTransform: "capitalize",
    },
    inputTextBox: {
      background: colors.white,
      marginTop: 0,
    },
   
  },
});

export default styles;
