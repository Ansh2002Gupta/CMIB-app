import React, { useContext } from "react";
import { View } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import styles, {
  getDataTextStyling,
  getStylesAsPerWidth,
  setCustomPosition,
} from "./DataCard.styles";

const DataCard = ({ data, customStyles, customPosition }) => {
  const { count, text } = data;
  const { color } = customStyles;
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  return (
    <View
      style={{
        ...getStylesAsPerWidth(currentBreakpoint, "outerContainer"),
        ...setCustomPosition(customPosition),
      }}
    >
      <CommonText
        fontWeight={"500"}
        customTextStyle={getDataTextStyling(color)}
      >
        {count}
      </CommonText>
      <CommonText fontWeight={"600"} style={styles?.textInfo}>
        {text}
      </CommonText>
    </View>
  );
};

export default DataCard;
