import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../../assets/colors";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  cardStyle: {
    paddingRight: 0,
  },
  customContainerStyle: (windowWidth) => ({
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingRight: windowWidth > 1200 ? 0 : 24,
    maxWidth: windowWidth > 1200 ? "66%" : "100%",
  }),
  customWebContainerStyle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    overflowX: "auto",
  },
  customViewModeStyle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    overflowX: "auto",
  },
  actionBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    paddingLeft: 24,
    paddingTop: 24,
    paddingBottom: 24,
    paddingRight: 86,
    backgroundColor: colors.backgroundColor,
  },
  buttonStyle: { maxHeight: 44, maxWidth: 80 },
  buttonTwoStyle: { maxHeight: 44, maxWidth: 150 },
  backButtonStyle: {
    fontSize: 14,
  },
  saveAndNextButton: {
    width: 150,
    height: 44,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: 5,
  },
  loaderContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    margin: 12,
  },
});

export default styles;
