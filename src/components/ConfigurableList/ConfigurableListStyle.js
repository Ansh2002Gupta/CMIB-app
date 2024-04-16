import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  outerContainer: {
    color: colors.black,
    backgroundColor: colors.white,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  componentContainer: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    paddingBottom: 10,
    borderRadius: 16,
    borderColor: colors.lightGray,
    borderWidth: 2,
    overflow: "hidden",
    minWidth: 300,
    minHeight: 360,
  },
  titleStyles: {
    fontWeight: 600,
    fontSize: 16,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    padding: 16,
    marginTop: 2,
    gap: 30,
  },
  buttonStyles: {
    borderWidth: 0,
    marginRight: 5,
    borderColor: colors.white,
    backgroundColor: colors.white,
    fontWeight: 100,
    fontSize: 28,
  },

  section: {
    display: "flex",
    flexDirection: "column",
  },

  itemsWrapper: {
    backgroundColor: colors.white,
    maxHeight: 250,
    overflowX: "hidden",
  },

  outerSearchWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 25,
    backgroundColor: colors.backgroundGrey,
  },

  outerSearchInputBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    marginTop: 0,
    backgroundColor: colors.backgroundGrey,
  },

  searchInput: {
    width: "100%",
    marginTop: 0,
    height: 48,
    outline: "none",
  },

  iconSearch: {
    height: 18,
    width: 18,
  },

  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 1,
    padding: 8,
    maxWidth: 300,
    gap: 15,
  },
  item: {
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 14,
    fontWeight: 500,
    color: colors.darkGrey,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: 200,
      },
    }),
  },
  iconTrash: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  iconAdd: {
    width: 20,
    height: 20,
  },
  message: {
    textAlign: "center",
    fontWeight: 500,
    color: colors.darkGrey,
    marginTop: 20,
  },
  selectedBackground: {
    backgroundColor: colors.shallowGreen,
  },
  unselectedBackground: {
    backgroundColor: colors.white,
  },
  selectedTextColor: {
    color: colors.black,
  },
  unselectedTextColor: {
    color: colors.lightGrey,
  },
});

export default styles;
