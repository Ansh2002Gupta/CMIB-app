import { StyleSheet } from "@unthinkable/react-core-components";

const styles = StyleSheet.create({
  zoomInfoContainer: {
    marginTop: 32,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  sliderBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  zoomIcon: {
    cursor: "pointer",
    width: 20,
    height: 20,
  },
  zoomSlider: {
    flex: 1,
  },
  percentageText: {
    fontSize: 14,
    minWidth: 36,
  },
});

export default styles;
