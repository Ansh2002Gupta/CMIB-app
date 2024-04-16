import { StyleSheet } from "@unthinkable/react-core-components";
import colors from "../../../assets/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex1: {
    flex: 1,
  },
  innerContainerStyle: {
    backgroundColor: colors.white,
    paddingTop: 12,
    paddingBottom: 12,
    zIndex: 2,
  },
  zIndex2: {
    zIndex: 2,
  },
});
export default styles;
