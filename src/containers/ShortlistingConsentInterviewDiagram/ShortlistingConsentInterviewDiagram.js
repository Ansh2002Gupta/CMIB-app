import { ScrollView, View } from "@unthinkable/react-core-components";
import React, { useContext } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";

import DataCard from "../../components/DataCard/DataCard";
import {
  cardConfigOverLine,
  cardConfigOverRectangle,
  dataCircleConfig,
  lineSegmentStylesForLine,
  lineSegmentStylesForRectangle,
} from "../../constants/constants";
import styles, {
  getStylesAsPerWidth,
} from "./ShortlistingConsentInterviewDiagram.styles";

const ShortlistingConsentInterviewDiagram = () => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  console.log(
    "style:",
    getStylesAsPerWidth(currentBreakpoint, "outerContainer")
  );
  return (
    <ScrollView
      style={{
        ...getStylesAsPerWidth(currentBreakpoint, "outerContainer"),
      }}
      showsVerticalScrollIndicator={
        currentBreakpoint !== "xs" && currentBreakpoint !== "sm"
      }
    >
      <View style={styles?.rectangle}>
        {lineSegmentStylesForRectangle.map((styleKey) => {
          return <View style={[styles?.borderSegment, styles[styleKey]]} />;
        })}
        {cardConfigOverRectangle.map((cardInfo, index) => {
          return (
            <DataCard
              key={index}
              data={cardInfo?.data}
              customPosition={cardInfo?.position}
              customStyles={cardInfo?.style}
            />
          );
        })}
        {dataCircleConfig.map((circleInfo) => {
          return (
            <View
              style={{
                ...styles?.dataCircle,
                ...getStylesAsPerWidth(currentBreakpoint, circleInfo?.styleKey),
              }}
            >
              {circleInfo?.data}
            </View>
          );
        })}
      </View>
      <View style={styles?.line}>
        {lineSegmentStylesForLine?.map((styleKey) => {
          return <View style={[styles.borderSegment, styles[styleKey]]} />;
        })}
        {cardConfigOverLine?.map((cardInfo, index) => {
          return (
            <DataCard
              key={index}
              data={cardInfo?.data}
              customPosition={cardInfo?.position}
              customStyles={cardInfo?.style}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ShortlistingConsentInterviewDiagram;
