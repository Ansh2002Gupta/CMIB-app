import colors from "../../assets/colors";

const styles = {
  container: {
    flexDirection: "row",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
  },
  containerWithoutBorder: {
    flexDirection: "row",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  webMainContainer: {
    flexWrap: "wrap",
    borderColor: colors.lightGrey,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
  webContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
  },
  horizontalStyles: {
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    width: "100%",
  },
  textHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  icons: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  editText:{
    marginLeft:8
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
    cursor: "pointer",
  },
  overView: {
    color: colors.darkGreySecond,
    fontSize: 14,
    paddingLeft: 8,
  },
  nameText: {
    color: colors.darkBlackSecond,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  notficationIconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileView: {
    flexDirection: "row",
    marginLeft: 10,
  },
  profileNameSection: {
    flexDirection: "row",
  },
  formHeaderStyle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  headerLeftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
  },
};
export default styles;
