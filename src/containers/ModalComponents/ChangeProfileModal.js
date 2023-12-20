import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Image, View } from '@unthinkable/react-core-components';
import { Button } from '@unthinkable/react-button';

import { ThreeRow, TwoColumn } from '../../core/layouts';

import CommonText from '../../components/CommonText';
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon';
import images from '../../images';
import styles from './modalComponent.style';

const ChangeProfileModal = ({ closeModal }) => {
  const intl = useIntl();
  const firstName = 'Kashish';
  const lastName = 'Bhatheja';
  const profileImage = 'https://picsum.photos/id/10/200/300';

  return (
    <View>
      <ThreeRow
        style={styles.changeProfileContainer}
        topSection={
          <TwoColumn
            style={styles.headingStyle}
            leftSection={
              <CommonText
                customTextStyle={styles.headingText}
                title={intl.formatMessage({ id: 'label.edit_profile_picture' })}
              />
            }
            rightSection={
              <Image
                source={images.iconCross}
                style={styles.crossIconStyle}
                onClick={closeModal}
              />
            }
          />
        }
        middleSection={
          <ProfileIcon
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            profileImageStyle={styles.profileImageStyle}
            imageContainerStyle={styles.imageContainerStyle}
          />
        }
        bottomSection={
          <TwoColumn
            style={styles.bottomSectionStyle}
            leftSection={
              <Button
                text={intl.formatMessage({ id: 'label.change' })}
                onPress={() => {}}
                disabled={false}
                disabledContainerStyle={{ opacity: 0.5 }}
                containerStyle={styles.cancelButton}
                textStyle={styles.buttonText}
                icon={images.iconChange}
                gap={8}
              />
            }
            rightSection={
              <Button
                text={intl.formatMessage({ id: 'label.remove' })}
                onPress={() => {}}
                disabled={false}
                disabledContainerStyle={{ opacity: 0.5 }}
                containerStyle={styles.cancelButton}
                textStyle={styles.buttonText}
                icon={images.iconDelete}
                gap={8}
              />
            }
          />
        }
      />
    </View>
  );
};
ChangeProfileModal.propTypes = {
  closeModal: PropTypes.func,
};

export default ChangeProfileModal;
