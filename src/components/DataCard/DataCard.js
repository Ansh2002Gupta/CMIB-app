import React, { useContext } from "react";
import { View } from "@unthinkable/react-core-components";
import PropTypes from "prop-types";
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
      <CommonText
        fontWeight={"600"}
        customTextStyle={styles?.textInfo}
        customContainerStyle={styles.textContainer}
      >
        {text}
      </CommonText>
    </View>
  );
};

DataCard.defaultProps = {
  data: {},
  customStyles: {},
  customPosition: {},
};

DataCard.propTypes = {
  data: PropTypes.object,
  customStyles: PropTypes.object,
  customPosition: PropTypes.object,
};

export default DataCard;
