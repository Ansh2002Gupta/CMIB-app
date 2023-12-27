import colors from "../../assets/colors";

const styles = {
  mainContainer: {
    flex: 1,
    position:"relative",
  },
  mainContainerWeb:{
    flex: 1,
    position:"relative",
  },
  container: {
    flex:1,
    height:"100%",
    backgroundColor: colors.black,
    paddingBottom:80
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 70,
    paddingRight: 70,
    paddingBottom: 24,
  },
  imageViewStyles: {
    paddingTop: 24,
  },
  imgViewStyle: {
    paddingTop: 40,
  },
  moduleText: {
    padding:16,
    backgroundColor: colors.offWhite,
    justifyContent:"space-between",
    alignItems:"center",
    borderBottomWidth: 1,
    borderBottomColor: colors.slateGray,
  },
  openModule:{
    padding:16,
    backgroundColor: colors.offWhite,
    justifyContent:"space-between",
    alignItems:"center",
    borderLeftWidth: 4,
    borderLeftColor: colors.white,
  },
  leftArrow: {
    height: 15,
    width: 15,
  },
  closeButton: {
    height: 20,
    width: 20,
  },
  leftArrowButton: {
    paddingTop: 16,
    paddingLeft: 16,
  },
  menuIcons:{
    height: 20,
    width: 20,
    marginRight:10,
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    backgroundColor: colors.offWhite,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.slateGray,
    opacity: 0.6,
    flexWrap:"wrap"
  },
  changeTextContainer:{
    backgroundColor: colors.offWhite,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    cursor: "pointer",
  },
  changeText: {
    color: colors.white,
    fontSize:14,
  },
  menuItemsText: {
    color: colors.black,
    fontSize:14,
  },
  sessionText: {
    color: colors.darkGrey,
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
  bottomView: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.offWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    cursor: "pointer",
    position:"absolute",
    bottom:0,
    width:"100%",
  },
  imageTextView: {
    flexDirection: "row",
  },
  visitWebsiteText: {
    color: colors.lightGrey,
    paddingLeft: 12,
    fontSize: 14,
  },
  globalIcon: {
    width: 18,
    height: 18,
  },
  moduleList: {
    fontSize: 14,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  moduleListItem: {
    padding: 16,
    width: '100%',
  },
  moduleMenuItems:{
    marginLeft:16,
    marginRight:16,
    marginTop:16,
    marginBottom:8,
    borderRadius:12,
    padding:16,
    flexDirection:"row",
    cursor:"pointer"
  },
  moduleActiveMenuItems:{
    marginLeft:16,
    marginRight:16,
    marginTop:16,
    marginBottom:8,
    borderRadius:12,
    padding:16,
    backgroundColor:colors.white,
    flexDirection:"row",
    cursor:"pointer"
  },
  disabled: {
    color: colors.slateGray
  },
  moduleSubMenuList: {
    listStyle: 'none',
    width: '100%',
    overflow: 'hidden',
  },

};

export default styles;
