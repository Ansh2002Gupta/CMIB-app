import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const style = {
  container: {
    flex: 1,
    overflow: "hidden",
    ...Platform.select({
      web: {
        marginBottom: 80,
      },
    }),
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 16,
    alignItems: "flex-end",
  },
  tabContainer: {
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    flex: 1,
  },
  marginLeft8: {
    marginLeft: 8,
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
  editButtonViewStyle: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
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
