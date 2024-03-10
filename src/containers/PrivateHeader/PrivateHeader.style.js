import colors from "../../assets/colors";

const styles = {
  webContainer: {
    flexWrap: "wrap",
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
  },
  icons: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullNameStyle: {
    fontSize: 14,
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
    marginLeft: 10,
  },
  overView: {
    color: colors.darkGreySecond,
    fontSize: 14,
    paddingLeft: 8,
  },
  nameText: {
    color: colors.darkBlackSecond,
    fontSize: 14,
    marginLeft: 8,
  },
  notficationIconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileView: {
    flexDirection: "row",
    marginLeft: 10,
    cursor: "pointer",
  },
  profileNameSection: {
    flexDirection: "row",
  },
};

export default styles;
