import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import images from "../../images";
import styles from "./ProfileIcon.style";

const ProfileIcon = ({
  customContainerStyle,
  customImageStyle,
  customTextStyle,
  firstName,
  lastName,
  onPressEditIcon,
  profileImage,
  showEditIcon,
}) => {
  const renderEditIcon = () => (
    <CustomTouchableOpacity
      style={styles.editOuterContainer}
      onPress={onPressEditIcon}
    >
      <View style={styles.editInnerContainer}>
        <CustomImage
          source={images.iconEditSvg}
          style={styles.iconStyle}
          isSvg
          Icon={images.iconEditSvg}
        />
      </View>
    </CustomTouchableOpacity>
  );

  if (profileImage) {
    return (
      <View style={styles.outerContainer}>
        <View style={{ ...styles.initialsContainer, ...customContainerStyle }}>
          <Image
            source={{ uri: profileImage }}
            style={{ ...styles.profileImageStyle, ...customImageStyle }}
          />
        </View>
        {showEditIcon && renderEditIcon()}
      </View>
    );
  } else {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    return (
      <View
        style={[
          styles.initialsContainer,
          styles.containerStyle,
          customContainerStyle,
        ]}
      >
        <CommonText
          customTextStyle={{ ...styles.initialsText, ...customTextStyle }}
        >
          {initials}
        </CommonText>
        {showEditIcon && renderEditIcon()}
      </View>
    );
  }
};

ProfileIcon.defaultProps = {
  customContainerStyle: {},
  customImageStyle: {},
  customTextStyle: {},
  firstName: "",
  lastName: "",
  onPressEditIcon: () => {},
  profileImage: "",
  showEditIcon: false,
};

ProfileIcon.propTypes = {
  customContainerStyle: PropTypes.object,
  customImageStyle: PropTypes.object,
  customTextStyle: PropTypes.object,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onPressEditIcon: PropTypes.func,
  profileImage: PropTypes.string,
  showEditIcon: PropTypes.bool,
};

export default ProfileIcon;
