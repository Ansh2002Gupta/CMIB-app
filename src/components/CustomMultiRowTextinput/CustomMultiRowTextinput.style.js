import { StyleSheet, Platform } from "@unthinkable/react-core-components";
const styles = StyleSheet.create({
  customWebContainerStyle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 0.2fr",
    alignItems: "center",
    overflowX: "auto",
    width: "100%",
  },
  detailErrorViewStyle: {
    position: "absolute",
    bottom: 6,
  },
  customContainerStyle: {
    flexDirection: "row",
    flexWrap: "unwrap",
  },
});
export default styles;
