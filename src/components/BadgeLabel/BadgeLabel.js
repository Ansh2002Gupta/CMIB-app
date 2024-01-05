import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./BadgeLabel.style";

const BadgeLabel = ({ badgeLabels, customContainerStyle, customTextStyle }) => {
  const { isWebView } = useIsWebView();

  return (
    <View
      style={[
        isWebView && style.webContainerStyle,
        style.containerStyle,
        customContainerStyle,
      ]}
    >
      {badgeLabels.map((label) => (
        <CommonText
          title={label}
          customTextStyle={style.badgeStyle}
          customContainerStyle={[
            isWebView && style.webInnerContainer,
            style.innerContainerStyle,
            customTextStyle,
          ]}
        />
      ))}
    </View>
  );
};

BadgeLabel.defaultProps = {
  customContainerStyle: {},
  customTextStyle: {},
};

BadgeLabel.propTypes = {
  badgeLabels: PropTypes.array.isRequired,
  customContainerStyle: PropTypes.object,
  customTextStyle: PropTypes.object,
};

export default BadgeLabel;
