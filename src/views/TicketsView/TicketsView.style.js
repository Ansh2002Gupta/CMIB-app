import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundGrey,
    padding: 24,
  },
  cellTextStyle:(fontSize = 14, fontWeight= 500)=>({
    fontSize:fontSize,
    fontWeight:fontWeight,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "120px",
      },
    }),
  }) ,
  inProgress:{
    textAlign:"center",
    paddingLeft:8,
    paddingRight:8,
    paddingTop:2,
    paddingBottom:2,
    borderRadius:16,
    backgroundColor:colors.lightOrange,
    color:colors.orange,
  },
  pending:{
    textAlign:"center",
    paddingLeft:8,
    paddingRight:8,
    paddingTop:2,
    paddingBottom:2,
    borderRadius:16,
    backgroundColor:colors.skyBlueLight,
    color:colors.skyBlueDark
  },
  close:{
    textAlign:"center",
    paddingLeft:8,
    paddingRight:8,
    paddingTop:2,
    paddingBottom:2,
    borderRadius:16,
    backgroundColor:colors.lightGreen,
    color:colors.darkGreen
  },
  tableHeadingText:{
    fontSize:12,
    fontWeight:"600",
    color:colors.darkGrey
  },
  columnStyle:(WIDTH:'15%') =>({
    width: WIDTH,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
  }),
  columnStyleBorder: {
    borderColor: colors.lightGrey,
    borderTopWidth: 0.5,
  },
  tableSection:{
    borderWidth:0.5,
    borderColor:colors.lightGrey,
    borderRadius:16,
    overflow:"hidden"
  },
  iconTicket:{
    height:20,
    width:20,
  }
});

export default styles;
