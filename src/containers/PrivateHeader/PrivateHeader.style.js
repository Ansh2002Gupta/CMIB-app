import colors from "../../assets/colors";

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  webContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F2F4FC",
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
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
    paddingTop: 8,
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
    fontWeight: "500",
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
    paddingRight: 25,
    paddingTop: 8,
  },
  overView: {
    color: "#71717A",
    fontSize: 14,
    fontWeight: "500",
    paddingLeft: 8,
    paddingTop: 8,
  },
  nameText: {
    color: "#18181B",
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
    paddingTop: 8,
  },
  profileView: {
    flexDirection: "row",
  },
};
export default styles;
