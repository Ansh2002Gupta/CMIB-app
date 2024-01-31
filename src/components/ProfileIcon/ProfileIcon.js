import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./ProfileIcon.style";

const ProfileIcon = ({
  customContainerStyle,
  customImageStyle,
  customTextStyle,
  firstName,
  iconType,
  lastName,
  profileImage,
  showEditModal,
}) => {
  if (profileImage) {
    return (
      <View style={{ ...styles.initialsContainer, ...customContainerStyle }}>
        <Image
          source={{ uri: profileImage }}
          style={[
            showEditModal && iconType === "modalIcon"
              ? styles.modalProfileImage
              : styles.profileImageStyle,
            customImageStyle,
          ]}
        />
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
      </View>
    );
  }
};

ProfileIcon.propTypes = {
  customContainerStyle: PropTypes.object,
  customImageStyle: PropTypes.object,
  customTextStyle: PropTypes.object,
  firstName: PropTypes.string,
  iconType: PropTypes.string,
  lastName: PropTypes.string,
  profileImage: PropTypes.string,
  showEditModal: PropTypes.bool,
};

export default ProfileIcon;
