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
    maxWidth: windowWidth > 1200 ? "66%" : "100%",
  }),
});

export default styles;
