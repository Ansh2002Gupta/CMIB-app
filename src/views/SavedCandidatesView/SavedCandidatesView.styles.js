import { StyleSheet, Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
  },
  flexRow: {
    flexDirection: "row",
  },
  arrayStyle: {
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: colors.secondaryGrey,
    borderRadius: 16,
    marginRight: 4,
    justifyContent: "center",
  },
  chipText: {
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: 150,
      },
    }),
  },
  iconTicketColoum: {
    backgroundColor: colors.white,
  },
  sortingIcon: {
    height: 16,
    width: 16,
    marginLeft: 5,
  },
  popupMessageStyle: {
    position: "absolute",
    top: 0,
    right: 50,
    height: "auto",
    width: "auto",
    minWidth: 250,
  },
});

export default styles;
