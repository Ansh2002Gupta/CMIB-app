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
    overflow: "scroll",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingRight: windowWidth > 1200 ? 0 : 24,
    maxWidth: windowWidth > 1200 ? "66%" : "100%",
  }),
  customWebContainerStyle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    overflowY: "auto",
  },
});

export default styles;
