import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./ProfileIcon.style";

const ProfileIcon = ({
  customContainerStyle,
  customImageStyle,
  firstName,
  iconType,
  lastName,
  profileImage,
  showEditModal,
}) => {
  if (profileImage) {
    return (
      <View
        style={[
          styles.initialsContainer,
          showEditModal &&
            iconType === "modalIcon" &&
            styles.editProfileContainer,
        ]}
      >
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
          showEditModal &&
            iconType === "modalIcon" &&
            styles.editProfileContainer,
          customContainerStyle,
        ]}
      >
        <CommonText title={initials} customTextStyle={styles.initialsText} />
      </View>
    );
  }
};

ProfileIcon.propTypes = {
  customContainerStyle: PropTypes.object,
  customImageStyle: PropTypes.object,
  firstName: PropTypes.string,
  iconType: PropTypes.string,
  lastName: PropTypes.string,
  profileImage: PropTypes.string,
  showEditModal: PropTypes.bool,
};

export default ProfileIcon;
