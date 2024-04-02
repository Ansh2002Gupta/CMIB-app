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
    borderRadius: "3px",
    height: "5px",
  },
  sliderValue: {
    position: "absolute",
    color: colors.darkGrey,
    marginTop: 20,
  },
  sliderValueText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
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
});
