import { StyleSheet } from "@unthinkable/react-core-components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 24,
    flex: 1,
  },
  get extendedViewStyle() {
    return (isExpanded) => ({
      height: isExpanded ? undefined : 70,
      paddingLeft: 20,
      paddingRight: 20,
    });
  },
  mainViewStyle: {
    paddingLeft: 4,
    paddingRight: 4,
  },
});
export default styles;
