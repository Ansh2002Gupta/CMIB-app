import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Image } from '@unthinkable/react-core-components';

import { ThreeRow, TwoColumn } from '../../core/layouts';

import CommonText from '../../components/CommonText';
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon';
import images from '../../images';
import styles from './ProfileActionMenu.style';

const ProfileActionMenu = ({ closePopover, openModal, setModalSelect }) => {
  const intl = useIntl();

  const firstName = 'Kashish';
  const lastName = 'Bhatheja';
  const profileImage = 'https://picsum.photos/id/10/200/300';
  const email = 'kashish.natheja@gmail.com';

  const handleChangePassword = () => {};
  const handleProfile = () => {};

  const accountList = [
    {
      id: 1,
      name: 'view Profile',
      label: 'label.view_profile',
      imageUrl: images.iconMyaccount,
      onPress: handleProfile,
    },
    {
      id: 2,
      name: 'Change Password',
      label: 'label.change_password',
      imageUrl: images.iconLock,
      onPress: handleChangePassword,
    },
  ];

  return (
    <ThreeRow
      style={styles.mainContainer}
      topSection={
        <ThreeRow
          style={styles.topSectionStyle}
          topSection={
            <ProfileIcon
              firstName={firstName}
              lastName={lastName}
              profileImage={profileImage}
              profileImageStyle={styles.profileImageStyle}
              imageContainerStyle={styles.imageContainerStyle}
            />
          }
          middleSection={
            <CommonText
              customTextStyle={styles.boldText}
              title={`${firstName} ${lastName}`}
            />
          }
          bottomSection={
            <CommonText customTextStyle={styles.normalText} title={email} />
          }
        />
      }
      middleSection={accountList.map((item) => {
        return (
          <TwoColumn
            onPress={() => {
              setModalSelect(item.id);
              closePopover();
              openModal();
            }}
            key={item.id}
            style={styles.itemContainerStyle}
            leftSection={
              <Image
                source={item.imageUrl}
                alt={item.name}
                style={styles.imageStyle}
              />
            }
            rightSection={
              <CommonText
                customTextStyle={styles.normalBlackText}
                title={intl.formatMessage({ id: item?.label })}
              />
            }
          />
        );
      })}
      middleSectionStyle={styles.middleSectionStyle}
      bottomSection={
        <TwoColumn
          onPress={() => {
            setModalSelect(3);
            closePopover();
            openModal();
          }}
          style={styles.itemContainerStyle}
          leftSection={
            <Image source={images.iconLogout} style={styles.imageStyle} />
          }
          rightSection={
            <CommonText
              customTextStyle={styles.normalBlackText}
              title={intl.formatMessage({ id: 'account.logout' })}
            />
          }
        />
      }
      bottomSectionStyle={styles.bottomSectionStyle}
    />
  );
};

ProfileActionMenu.propTypes = {
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  setModalSelect: PropTypes.func,
};

export default ProfileActionMenu;
