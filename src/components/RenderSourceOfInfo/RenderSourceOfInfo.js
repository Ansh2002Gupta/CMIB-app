import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CheckBox from "../CheckBox";
import BadgeLabel from "../BadgeLabel/BadgeLabel";

const RenderSourceOfInfo = ({
  badgeStyle,
  containerStyle,
  handleToggle,
  isEditProfile,
  options,
  profileResult,
}) => {
  return isEditProfile ? (
    <View style={containerStyle}>
      {options.map((item, index) => (
        <CheckBox
          key={item?.id}
          id={item?.id}
          index={index}
          title={item?.title}
          isSelected={item?.isSelected}
          handleCheckbox={handleToggle}
        />
      ))}
    </View>
  ) : (
    <BadgeLabel
      badgeLabels={profileResult}
      customTextContainerStyle={badgeStyle}
    />
  );
};

RenderSourceOfInfo.defaultProps = {
  badgeStyle: {},
  containerStyle: {},
  options: [],
  profileResult: [],
};

RenderSourceOfInfo.propTypes = {
  badgeStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  options: PropTypes.array,
  profileResult: PropTypes.array,
};

export default RenderSourceOfInfo;
