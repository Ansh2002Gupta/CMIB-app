import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import { HYPHEN } from "../../constants/constants";
import getStyles from "./BadgeLabel.style";

const BadgeLabel = ({
  badgeLabels,
  customContainerStyle,
  customTextContainerStyle,
  customTextStyle,
}) => {
  const { isWebView } = useIsWebView();
  const theme = useTheme();
  const style = getStyles(theme);

  const containerStyles = {
    ...((isWebView && style.webContainerStyle) || {}),
    ...style.containerStyle,
    ...customContainerStyle,
  };
  return (
    <View style={containerStyles}>
      {!!badgeLabels?.length ? (
        badgeLabels?.map((label, index) => (
          <CommonText
            key={index}
            customTextStyle={{ ...style.badgeStyle, ...customTextStyle }}
            customContainerStyle={{
              ...(isWebView && style.webInnerContainer),
              ...style.innerContainerStyle,
              ...customTextContainerStyle,
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
  customTextContainerStyle: {},
  customTextStyle: {},
};

BadgeLabel.propTypes = {
  badgeLabels: PropTypes.array,
  customContainerStyle: PropTypes.object,
  customTextContainerStyle: PropTypes.object,
  customTextStyle: PropTypes.object,
};

export default BadgeLabel;
