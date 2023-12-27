import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";
const styles = {
  containerStyle: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  saveStyle: {
    backgroundColor: colors.green,
    marginLeft: 16,
  },
  negativePadding: { 
    paddingBottom: 0 ,
    marginBottom: 24,
  },
  // vacancyStyle: {
  //   marginTop: 24,
  // },
  leftTextStyle: {
    fontSize: 14,
    fontWeight: "600",
  },
  rightTextStyle: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  parentStyle:{
    ...Platform.select({
      ios: {
        marginBottom: 30, 
      },
      default:{
        marginTop: 24, 
      }
    }),
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
};

export default styles;
