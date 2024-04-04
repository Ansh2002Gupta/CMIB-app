import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
  container: {
    flex: 1,
  },
  backgroundWhite: {
    backgroundColor: colors.white,
  },
  padding16: {
    padding: 16,
  },
  paddingAllSide: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});
export default styles;
