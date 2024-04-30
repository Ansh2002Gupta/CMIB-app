import React from "react";
import { View } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";

import getStyles from "./styles";

const CircularProgress = ({ size, strokeWidth, progress, containerStyle }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const svgProgress = progress * circumference;

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          stroke={theme.colors.lightGrey}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          stroke={theme.colors.green}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - svgProgress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
    </View>
  );
};

export default CircularProgress;
