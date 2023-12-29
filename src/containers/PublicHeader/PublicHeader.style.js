import colors from "../../assets/colors";

const style = {
  mainView: {
    backgroundColor: colors.white,
    paddingTop: 24,
    paddingBottom: 24,
  },
  containerStyle: {
    marginRight: 16,
    marginLeft: 16,
    marinTop: 16,
    marinBottom: 16,
    width: "30%",
    minWidth: 120,
  },
  webMainView: {
    paddingTop: 26,
    paddingBottom: 24,
    paddingLeft: 72,
    paddingRight: 72,
  },
  headerBorder: {
    borderBottom: `1px solid ${colors.lightGrey}`,
  },
  smContainerStyle: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  webContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignIems: "center",
  },
  rightIconContainer: {
    flexDirection: "row",
    gap: 16,
  },
  cmibLogo: {
    width: 166,
    height: 54,
  },
  gloPac: {
    width: 82,
    height: 40,
    alignSelf: "center",
  },
  iconG20: {
    width: 70,
    height: 40,
    alignSelf: "center",
  },
  iconAzadiMahotsav: {
    width: 67,
    height: 40,
    alignSelf: "center",
  },
};

export default style;
