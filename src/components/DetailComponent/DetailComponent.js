import React, { useContext } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./DetailComponent.style";

const DetailComponent = ({ details, headerText }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();

  const gridStyles = {
    xl: "1fr 1fr 1fr",
    lg: "1fr 1fr",
    md: "1fr 1fr",
    sm: "1fr 1fr",
  };

  const columnCount = isWebView && gridStyles[currentBreakpoint];

  const containerStyle = isWebView
    ? style.containerGridStyle(columnCount)
    : style.containerStyle;

  return (
    <View>
      {!!headerText && (
        <CommonText customTextStyle={style.headerText} fontWeight="600">
          {headerText}
        </CommonText>
      )}
      <View style={containerStyle}>
        {details?.map((detail, index) => (
          <View
            key={index}
            style={detail.isRow ? style.rowStyle : style.innerContainer}
          >
            <View style={[style.titleContainer]}>
              <CommonText customTextStyle={style.titleStyle}>
                {detail.title}
              </CommonText>
              <CommonText customTextStyle={style.starStyle}>{" *"}</CommonText>
            </View>
            <CommonText
              customTextStyle={[
                style.valueStyle,
                detail.isLink && style.linkStyle,
              ]}
            >
              {detail.value}
            </CommonText>
          </View>
        ))}
      </View>
    </View>
  );
};

DetailComponent.propTypes = {
  details: PropTypes.array.isRequired,
  headerText: PropTypes.string,
};

export default DetailComponent;
