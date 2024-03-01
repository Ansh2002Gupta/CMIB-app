import { Platform, StyleSheet } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";

export const styles = StyleSheet.create({
  switch: {
    position: "relative",
    width: 36,
    height: 20,
    ...Platform.select({
      web: {
        transition: "0.4s",
        WebkitTransition: "0.4s",
        cursor: "pointer",
      },
    }),
  },
  slider: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.lightGrey,
    borderRadius: 34,
    ...Platform.select({
      web: {
        transition: "0.4s",
        WebkitTransition: "0.4s",
      },
    }),
  },
  sliderActive: {
    backgroundColor: colors.green,
  },
  disabled: {
    opacity: 0.65,
    ...Platform.select({
      web: {
        cursor: "not-allowed",
      },
    }),
  },
  sliderBall: {
    position: "absolute",
    height: 16,
    width: 16,
    left: 2,
    bottom: 2,
    backgroundColor: colors.white,
    borderRadius: 8,
    ...Platform.select({
      web: {
        transition: "0.4s",
        WebkitTransition: "0.4s",
      },
    }),
  },
  sliderBallActive: {
    ...Platform.select({
      web: {
        transform: "translateX(16px)",
      },
      default: {
        transform: [{ translateX: 16 }],
      },
    }),
  },
});
