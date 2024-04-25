import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  container: {
    flex: 1,
    overflow: "hidden",
    ...Platform.select({
      web: {
        marginBottom: 20,
      },
    }),
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tabContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight:16,
    backgroundColor: colors.white,
    flex: 1,
  },
  marginLeft8: {
    marginLeft: 4,
  },
  itemContainer: {
    height: 36,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px 8px 0 0",
    cursor: "pointer",
  },
  editButtonViewStyle: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 12,
    paddingLeft: 12,
    borderColor: colors.lightGrey,
    paddingTop: 8,
    paddingBottom: 8,
    height: 36,
  },
  editIconStyle: {
    height: 20,
    width: 30,
  },
  activeItemContainer: {
    backgroundColor: colors.blue,
    borderColor: "transparent",
  },
  itemText: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 20,
  },
  activeItemText: {
    color: colors.white,
  },
  flex1: {
    flex: 1,
  },

  scrollViewContainer: { 
    flex: 1,
    borderBottomColor: colors.blue,
    borderBottomWidth:1,
  },
};

export default style;
