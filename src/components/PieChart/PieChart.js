import React from "react";
import { VictoryPie } from "victory";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CommonText from "../CommonText";
import PopupMessage from "../PopupMessage/PopupMessage";
import { convertGraphData } from "../../utils/util";
import styles from "./PieChart.style";
import colors from "../../assets/colors";

const PieChart = ({
  colorScale,
  data,
  height,
  label,
  labelColor,
  labelFontSize,
  labelRadius,
  onPopupClick,
  popupMessage,
  width,
}) => {
  const renderLabel = ({ datum }) => {
    if (datum && datum.hasOwnProperty("x") && datum.hasOwnProperty("y")) {
      return `${datum.x}: ${datum.y}`;
    }
    return "";
  };

  return (
    <TwoRow
      style={styles.pieChartContainer}
      topSection={
        <TwoColumn
          isLeftFillSpace
          leftSection={
            <CommonText customTextStyle={styles.headerText} fontWeight="600">
              {label}
            </CommonText>
          }
          rightSection={
            popupMessage ? (
              <PopupMessage
                message={[popupMessage]}
                onPopupClick={onPopupClick}
              />
            ) : (
              <></>
            )
          }
        />
      }
      bottomSection={
        <VictoryPie
          height={height}
          width={width}
          data={convertGraphData(data)}
          innerRadius={1}
          colorScale={colorScale}
          labelRadius={({ innerRadius }) => innerRadius + labelRadius}
          labels={renderLabel}
          style={{
            data: {
              stroke: colors.white,
              strokeWidth: 0.25,
            },
            labels: {
              fill: labelColor,
              fontSize: labelFontSize,
              fontWeight: "600",
            },
          }}
        />
      }
    />
  );
};

export default PieChart;
