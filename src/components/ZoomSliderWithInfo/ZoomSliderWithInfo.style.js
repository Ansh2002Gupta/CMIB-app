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
    width: 24,
    height: 24,
  },
  zoomSlider: {
    flex: 1,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default styles;
