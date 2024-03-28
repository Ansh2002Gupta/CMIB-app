import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import { HYPHEN } from "../../constants/constants";
import style from "./BadgeLabel.style";

const BadgeLabel = ({ badgeLabels, customContainerStyle, customTextStyle }) => {
  const { isWebView } = useIsWebView();

  const containerStyles = {
    ...((isWebView && style.webContainerStyle) || {}),
    ...style.containerStyle,
    ...customContainerStyle,
  };

  return (
    <View style={containerStyles}>
      {!!badgeLabels.length ? (
        badgeLabels.map((label, index) => (
          <CommonText
            key={index}
            customTextStyle={style.badgeStyle}
            customContainerStyle={{
              ...(isWebView && style.webInnerContainer),
              ...style.innerContainerStyle,
              ...customTextStyle,
            }}
          >
            {label}
          </CommonText>
        ))
      ) : (
        <CommonText>{HYPHEN}</CommonText>
      )}
    </View>
  );
};

BadgeLabel.defaultProps = {
  badgeLabels: [],
  customContainerStyle: {},
  customTextStyle: {},
};

BadgeLabel.propTypes = {
  badgeLabels: PropTypes.array,
  customContainerStyle: PropTypes.object,
  customTextStyle: PropTypes.object,
};

export default BadgeLabel;
