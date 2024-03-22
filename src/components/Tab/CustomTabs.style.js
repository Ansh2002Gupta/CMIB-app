import colors from "../../assets/colors";

const style = {
  container: {
    flex: 1,
    overflow: "hidden",
  },
  headerContainer: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
  },
  tabsContainer: {},
  itemContainer: {
    height: 38,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    cursor: "pointer",
    justifyContent: "center",
  },
  activeItemContainer: {
    borderBottomColor: colors.darkBlue,
  },
  itemText: {
    color: colors.mediumGray,
    fontSize: 14,
    lineHeight: 24,
  },
  activeItemText: {
    color: colors.black,
  },
};

export default style;
