import colors from "../../assets/colors";

const style = {
  container: {
    flex: 1,
    overflow: "hidden",
  },
  tabContainer: {
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
  },
  itemContainer: {
    height: 36,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    cursor: "pointer",
  },
  activeItemContainer: {
    backgroundColor: colors.green,
    borderColor: "transparent",
  },
  itemText: {
    color: colors.black,
    fontSize: 14,
    lineHeight: 20,
  },
  activeItemText: {
    color: colors.white,
  },
};

export default style;
