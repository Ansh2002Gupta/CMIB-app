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
  cardStyle: {
    backgroundColor: colors.offWhite,
    paddingRight: 0,
    paddingLeft: 0,
    borderRadius: 0,
    borderWidth: 0,
    paddingTop: 0,
  },
});
export default styles;
