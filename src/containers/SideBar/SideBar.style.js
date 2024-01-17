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
    paddingBottom: 24,
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
  },
  menuIcons: {
    height: 20,
    width: 20,
    marginRight: 10,
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
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.offWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    cursor: "pointer",
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex:2,
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
  moduleMenuItems: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 8,
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
    marginTop: 16,
    marginBottom: 8,
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
  logoImage: {
    height: 54,
  },
  closeIcon: {
    ...Platform.select({
      web: {
        height: 15,
        width: 15,
      },
      default: {
        height: 24,
        width: 24,
      }
    }),
  }
});

export default styles;
