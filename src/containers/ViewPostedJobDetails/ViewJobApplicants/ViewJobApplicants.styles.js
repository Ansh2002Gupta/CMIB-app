import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainerStyle: {
    backgroundColor: colors.white,
    paddingTop: 12,
    paddingBottom: 12,
    zIndex: 2,
  },
});
export default styles;
