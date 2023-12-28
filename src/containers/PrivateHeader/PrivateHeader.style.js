import colors from "../../assets/colors";

const styles = {
  container: {
    flexDirection: "row",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  sideBarVisible:{
    justifyContent:"flex-end"
  },
  sideBarNotVisible:{
    justifyContent:"space-between"
  },
  webContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    paddingTop: 16,
    paddingBottom: 20,
    paddingLeft: 24,
    paddingRight: 24,
    flexWrap:"wrap"
  },
  borderStyling: {
    borderColor: colors.lightGrey,
    borderWidth: 1,
  },
  icons: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flexDirection: "row",
  },
  profileContainer: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  detailContainer: {
    marginLeft: 12,
  },
  fullNameStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
  roleStyle: {
    paddingTop: 5,
    fontSize: 12,
    color: colors.subHeadingGray,
  },
  iconArrow: {
    width: 16,
    height: 16,
    paddingLeft: 16,
    paddingTop: 17,
  },
  iconNotification: {
    width: 24,
    height: 24,
  },
  overView: {
    color: colors.darkGreySecond,
    fontSize: 14,
    paddingLeft: 8,
    paddingTop: 8,
  },
  nameText: {
    color: colors.darkBlackSecond,
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 8,
  },
  menuButton: {
    paddingRight: 20,
    paddingTop: 4,
  },
  notficationIconView: {
    flexDirection: "row",
    alignItems:"center"
  },
  profileView: {
    flexDirection: "row",
    marginLeft: 25,
  },
  profileNameSection:{
    flexDirection: "row",
  }
};
export default styles;
