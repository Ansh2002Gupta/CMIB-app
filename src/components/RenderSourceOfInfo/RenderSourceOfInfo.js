import React from "react";
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
  console.log("options", options);

  return isEditProfile ? (
    <View style={containerStyle}>
      {options.map((item, index) => (
        <CheckBox
          key={item.id}
          id={item.id}
          index={index}
          title={item.title}
          isSelected={item.isSelected}
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

export default RenderSourceOfInfo;
