import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CheckBox from "../CheckBox";
import BadgeLabel from "../BadgeLabel/BadgeLabel";

const RenderSourceOfInfo = ({
  badgeStyle,
  isEditProfile,
  options,
  containerStyle,
  handleToggle,
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

RenderSourceOfInfo.propTypes = {
  badgeStyle: PropTypes.object,
  options: PropTypes.array,
  containerStyle: PropTypes.object,
  profileResult: PropTypes.array,
};

RenderSourceOfInfo.defaultProps = {
  badgeStyle: {},
  options: [],
  containerStyle: {},
  profileResult: [],
};

export default RenderSourceOfInfo;
