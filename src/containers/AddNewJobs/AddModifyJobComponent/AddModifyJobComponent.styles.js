import { StyleSheet } from "@unthinkable/react-core-components";

const styles = StyleSheet.create({
  get extendedViewStyle() {
    return (isExpanded) => ({
      height: isExpanded ? undefined : 70,
      paddingLeft: 20,
      paddingRight: 20,
      overflow: "hidden",
    });
  },
  mainViewStyle: {
    paddingLeft: 4,
    paddingRight: 4,
  },
});
export default styles;
