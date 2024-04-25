import { Platform } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = {
  webHeaderContainer: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomColor: colors.white,
    borderTopColor: colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: colors.white,
  },
  headerText: (isWebView) => ({
    fontSize: isWebView ? 32 : 20,
  }),
  headerContainer: {
    borderBottomColor: colors.white,
    borderBottomWidth: 0,
    ...Platform.select({
      web: {
        borderTopColor: colors.white,
        borderTopWidth: 1,
        paddingTop: 24,
      },
    }),
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 16,
  },
  mainContainer: {
    flex: 1,
  },
  row: {
    flex: 1,
  },
  popupMessageStyle: {
    position: "absolute",
    top: 0,
    right: 15,
    height: "auto",
    width: "auto",
    minWidth: 233,
    zIndex: 1,
  },
  mobileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderColor: colors.greyOne,
    backgroundColor: colors.white,
    zIndex: 0,
    position: "relative",
  },
  rowsPerPageWeb: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconTicket: {
    height: 20,
    width: 20,
  },
  cellTextStyle: (fontSize = 14) => ({
    fontSize,
    ...Platform.select({
      web: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "100%",
      },
    }),
  }),
  modalStyle: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    margin: 0,
  },
  modalContainer: {
    borderTopRadius: 12,
    height: "auto",
    backgroundColor: colors.white,
    padding: 24,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 80,
    radius: 20,
    overflow: "hidden",
  },
  popupHeaderText: {
    fontSize: 20,
  },

  customCardStyle: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingRight: 0,
    paddingLeft: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  sortingIcon: {
    height: 16,
    width: 16,
    marginLeft: 2,
  },
  containerStyle: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    ...Platform.select({
      web: {
        borderTopWidth: 0,
        paddingTop: 24,
        backgroundColor: colors.white,
      },
    }),
    paddingLeft: 24,
    paddingRight: 24,
  },
  tableHeadingText:{
    color: colors.darkGrey,
  },
  tableRowText:{
    fontSize: 14,
  }
};

export default styles;
