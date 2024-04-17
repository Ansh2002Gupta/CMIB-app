import { StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

export const styles = StyleSheet.create({
  thumbAndLabelBox: {
    position: "relative",
  },
  thumb: {
    pointerEvents: "none",
    position: "absolute",
    height: 0,
    width: "100%",
    outline: "none",
  },
  thumbValue: {
    position: "absolute",
  },
  elevatedThumbSm: {
    zIndex: 3,
  },
  elevatedThumbMd: {
    zIndex: 4,
  },
  elevatedThumbLg: {
    zIndex: 5,
  },
  slider: {
    position: "relative",
    width: "100%",
  },
  sliderCommon: {
    position: "absolute",
    borderRadius: 3,
    height: 5,
  },
  sliderValue: {
    position: "absolute",
    color: colors.darkGrey,
    marginTop: 20,
  },
  sliderValueText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.darkGrey,
  },
  sliderTrack: {
    backgroundColor: colors.greyFive,
    width: "100%",
    zIndex: 1,
  },
  sliderRange: {
    backgroundColor: colors.green,
    zIndex: 2,
  },
  sliderLeftValue: {
    left: 6,
  },
  sliderRightValue: {
    right: -4,
  },
  thumbStyle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.green,
    backgroundColor: colors.white,
  },
  selectedRailStyle: {
    height: 4,
    backgroundColor: colors.green,
    borderRadius: 2,
  },
  railStyle: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.greyFive,
  },
  notchStyle: {
    width: 8,
    height: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.green,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  labelStyle: {
    alignItems: "center",
    padding: 4,
    borderRadius: 4,
  },
});
