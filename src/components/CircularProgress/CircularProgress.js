import { View } from "@unthinkable/react-core-components";
import React from "react";
import styles from "./styles";
import colors from "../../assets/colors";

const CircularProgress = ({ size, strokeWidth, progress, containerStyle }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const svgProgress = progress * circumference;

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          stroke={colors.lightGrey}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          stroke={colors.green}
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
