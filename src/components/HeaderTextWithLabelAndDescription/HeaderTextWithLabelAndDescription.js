import React, { useContext } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import { getResponsiveStyles, style } from "./HeaderTextWithLabelAndDescription.style";

const HeaderTextWithLabelAndDescription = ({
  headerText,
  label,
  description,
  customTextStyle,
  customSecondHeadingStyles,
  customContainerStyles,
}) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  return (
    <View style={[style.headerContainer, customContainerStyles]}>
      {!!label && <CommonText title={label} customTextStyle={style.labelText} />}
      {!!headerText && (
        <CommonText
          customTextStyle={[
            getResponsiveStyles({ str: "headerText", currentBreakpoint }),
            style.heading,
            customTextStyle,
          ]}
          title={headerText}
        />
      )}
      {!!description && (
        <CommonText
          customTextStyle={[style.secondHeading, customSecondHeadingStyles]}
          title={description}
        />
      )}
    </View>
  );
};

export default HeaderTextWithLabelAndDescription;
