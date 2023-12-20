import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from '@unthinkable/react-core-components';

import CommonText from '../CommonText';
import styles from './ProfileIcon.style';

const ProfileIcon = ({
  firstName,
  icon,
  iconType,
  imageContainerStyle,
  initialContainerStyle,
  lastName,
  onClick,
  profileImage,
  profileImageStyle,
  showEditModal,
}) => {
  if (profileImage) {
    return (
      <View
        style={[
          styles.initialsContainer,
          showEditModal &&
            iconType === 'modalIcon' &&
            styles.editProfileContainer,
          imageContainerStyle,
        ]}
      >
        <Image
          source={{ uri: profileImage }}
          style={[
            showEditModal && iconType === 'modalIcon'
              ? styles.modalProfileImage
              : styles.profileImageStyle,
            profileImageStyle,
          ]}
        />
        {icon && (
          <Image source={icon} style={styles.editIcon} onClick={onClick} />
        )}
      </View>
    );
  } else {
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    return (
      <View
        style={[
          styles.initialsContainer,
          showEditModal &&
            iconType === 'modalIcon' &&
            styles.editProfileContainer,
          initialContainerStyle,
        ]}
      >
        <CommonText title={initials} customTextStyle={styles.initialsText} />
      </View>
    );
  }
};

ProfileIcon.propTypes = {
  firstName: PropTypes.string,
  icon: PropTypes.element,
  iconType: PropTypes.string,
  imageContainerStyle: PropTypes.object,
  initialContainerStyle: PropTypes.object,
  lastName: PropTypes.string,
  onClick: PropTypes.func,
  profileImage: PropTypes.string,
  profileImageStyle: PropTypes.object,
  showEditModal: PropTypes.bool,
};

export default ProfileIcon;
