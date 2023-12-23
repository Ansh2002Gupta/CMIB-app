import colors from "../../assets/colors";
const style = {
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 16,
    justifyContent: 'flex-start',
    
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  imageParentStyle:{
    borderWidth:1,
    borderColor:colors.lightGrey,
    backgroundColor:colors.white,
    borderRadius: 8,
    marginLeft: 16,
    paddingLeft: 12,
    paddingRight:12,
  },
  webView :{
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

export default style;
