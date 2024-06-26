import { ScrollView, View } from "@unthinkable/react-core-components";
import React, { useContext, useEffect, useState } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";

import DataCard from "../../components/DataCard/DataCard";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../components/LoadingScreen";
import useShortlistingConsentInterview from "./useShortlistingConsentInterview";
import {
  cardConfigOverLine,
  cardConfigOverRectangle,
  dataCircleConfig,
  diagramSupportEnum,
  lineSegmentStylesForLine,
  lineSegmentStylesForRectangle,
  returnColorArray,
} from "../../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import styles, {
  getStylesAsPerWidth,
} from "./ShortlistingConsentInterviewDiagram.styles";

const ShortlistingConsentInterviewDiagram = ({ round_id, centre_id }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const [diagramDataState, setDiagramDataState] = useState({
    cardConfigRectangle: [],
    cardConfigLine: [],
    circleConfig: [],
  });
  const [colorArray, setColorArray] = useState({
    cardConfigOverRectangleColorArray: [],
    cardConfigOverLineColorArray: [],
  });

  const {
    diagramData,
    fetchDiagramData,
    isDiagramDataLoading,
    isErrorDiagramData,
    errorDiagramData,
  } = useShortlistingConsentInterview({
    roundId: round_id,
    centreId: centre_id,
  });

  useEffect(() => {
    if (!!diagramData) setApiDataToObjects();
  }, [diagramData]);

  const setApiDataToObjects = () => {
    cardConfigOverRectangle?.forEach((card) => {
      if (diagramData?.hasOwnProperty(card?.refKey)) {
        card.data.count = !!diagramData?.[card?.refKey]
          ? diagramData?.[card?.refKey]
          : 0;
      }
    });
    cardConfigOverLine.forEach((card) => {
      if (diagramData?.hasOwnProperty(card?.refKey)) {
        card.data.count = !!diagramData?.[card?.refKey]
          ? diagramData?.[card?.refKey]
          : 0;
      }
    });
    dataCircleConfig.forEach((card) => {
      if (diagramData?.hasOwnProperty(card?.refKey)) {
        card.data = !!diagramData?.[card?.refKey]
          ? diagramData?.[card?.refKey]
          : 0;
      }
    });
    setDiagramDataState((prev) => ({
      ...prev,
      cardConfigRectangle: cardConfigOverRectangle,
      cardConfigLine: cardConfigOverLine,
      circleConfig: dataCircleConfig,
    }));
    const tempColorArray1 = returnColorArray(diagramSupportEnum.RECTANGLE_CARD);
    const tempColorArray2 = returnColorArray(diagramSupportEnum.LINE_CARD);
    setColorArray({
      cardConfigOverRectangleColorArray: tempColorArray1,
      cardConfigOverLineColorArray: tempColorArray2,
    });
  };

  return !!diagramData && !isDiagramDataLoading && !isErrorDiagramData ? (
    <ScrollView
      style={{
        ...getStylesAsPerWidth(currentBreakpoint, "outerContainer"),
      }}
      showsVerticalScrollIndicator={
        currentBreakpoint !== "xs" && currentBreakpoint !== "sm"
      }
    >
      {isDiagramDataLoading && !isErrorDiagramData ? (
        <LoadingScreen />
      ) : (
        <>
          <View style={styles?.rectangle}>
            {!!diagramData &&
              lineSegmentStylesForRectangle.map((styleKey, index) => {
                return (
                  <View
                    key={index}
                    style={[styles?.borderSegment, styles?.[styleKey]]}
                  />
                );
              })}
            {!!diagramData && (
              <>
                <View style={styles.tempBox1}></View>
                <View style={styles.tempBox2}></View>
              </>
            )}
            {diagramDataState?.cardConfigRectangle?.map((cardInfo, index) => {
              return (
                <DataCard
                  key={index}
                  data={
                    !!cardInfo?.data || cardInfo?.data === 0
                      ? cardInfo?.data
                      : "_"
                  }
                  customPosition={cardInfo?.position}
                  customStyles={{
                    color:
                      colorArray?.cardConfigOverRectangleColorArray?.[index],
                  }}
                />
              );
            })}
            {diagramDataState?.circleConfig?.map((circleInfo, index) => {
              return (
                <View
                  key={index}
                  style={{
                    ...styles?.dataCircle,
                    ...getStylesAsPerWidth(
                      currentBreakpoint,
                      circleInfo?.styleKey
                    ),
                  }}
                >
                  {circleInfo?.data}
                </View>
              );
            })}
          </View>
          {!!diagramData && (
            <View style={styles?.line}>
              {!!diagramData &&
                lineSegmentStylesForLine?.map((styleKey, index) => {
                  return (
                    <View
                      key={index}
                      style={[styles.borderSegment, styles[styleKey]]}
                    />
                  );
                })}
              {diagramDataState?.cardConfigLine?.map((cardInfo, index) => {
                return (
                  <DataCard
                    key={index}
                    data={
                      !!cardInfo?.data || cardInfo?.data === 0
                        ? cardInfo?.data
                        : "_"
                    }
                    customPosition={cardInfo?.position}
                    customStyles={{
                      color: colorArray?.cardConfigOverLineColorArray?.[index],
                    }}
                  />
                );
              })}
            </View>
          )}
        </>
      )}
    </ScrollView>
  ) : (
    <>
      {isDiagramDataLoading && !isErrorDiagramData && <LoadingScreen />}
      {isErrorDiagramData && (
        <ErrorComponent
          errorMsg={
            errorDiagramData?.data?.message ||
            GENERIC_GET_API_FAILED_ERROR_MESSAGE
          }
          onRetry={fetchDiagramData}
          disableRetryBtn={isDiagramDataLoading}
        />
      )}
    </>
  );
};

export default ShortlistingConsentInterviewDiagram;
