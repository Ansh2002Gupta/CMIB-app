import { StyleSheet, Platform } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

const styles = StyleSheet.create({
  mainContainerWeb: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.black,
    paddingBottom: 80,
    paddingTop: 32,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 70,
    paddingRight: 70,
    paddingBottom: 32,
  },
  imageViewStyles: {
    paddingTop: 24,
  },
  imgViewStyle: {
    paddingTop: 40,
  },
  moduleText: {
    padding: 16,
    backgroundColor: colors.offWhite,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.slateGray,
  },
  openModule: {
    padding: 16,
    backgroundColor: colors.offWhite,
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: colors.white,
  },
  leftArrow: {
    height: 15,
    width: 15,
  },
  closeButton: {
    marginTop: 16,
    marginLeft: 16,
    ...Platform.select({
      web: {
        height: 15,
        width: 15,
      },
      default: {
        height: 24,
        width: 24,
      },
    }),
  },
  menuIcons: {
    height: 18,
    width: 18,
    marginRight: 10,
  },
  bottomSection: {
    flex: 1,
    zIndex: 1,
    paddingBottom: 60,
  },
  changeText: {
    color: colors.white,
    fontSize: 14,
  },
  menuItemsText: {
    color: colors.black,
    fontSize: 14,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 2,
  },
  bottomButton: {
    padding: 24,
    backgroundColor: colors.offWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    cursor: "pointer",
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 2,
  },
  imageTextView: {
    flexDirection: "row",
  },
  visitWebsiteText: {
    color: colors.lightGrey,
    paddingLeft: 12,
    fontSize: 14,
  },
  logoStyle: {
    margin: 20,
    height: 40,
    width: 53,
    ...Platform.select({
      web: {
        marginBottom: 90,
      },
      default: {
        marginBottom: 100,
      },
    }),
  },
  globalIcon: {
    width: 18,
    height: 18,
  },
  moduleMenuItems: {
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  moduleActiveMenuItems: {
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.white,
    flexDirection: "row",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mobContainer: {
    marginBottom: 16,
  },
  cmiLogo: {
    height: 50,
  },
  backBtnStyles: {
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 8,
    paddingLeft: 13,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    color: colors.white,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 0,
  },
  btnTextStyles: {
    color: colors.backgroundColor,
    fontSize: 14,
  },
  menuSubItems: {
    marginTop: 24,
  }
});

export default styles;
